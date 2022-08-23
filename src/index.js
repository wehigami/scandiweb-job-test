import "./index.scss";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import All from "./routes/all";
import Clothes from "./routes/clothes";
import Tech from "./routes/tech";
import ProductPage from "./routes/productPage";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
//Connect to the provided endpoint using ApolloClient

export const links = [
  { name: "all", href: "/all", element: <All /> },
  { name: "clothes", href: "/clothes", element: <Clothes /> },
  { name: "tech", href: "/tech", element: <Tech /> },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            {links.map((link) => {
              return (
                <Route
                  path={link.href}
                  element={link.element}
                  key={link}
                ></Route>
              );
            })}
            <Route path="product">
              <Route path=":productId" element={<ProductPage />} />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);
