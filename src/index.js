import "./index.scss";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Women from "./routes/women";
import Men from "./routes/men";
import Kids from "./routes/kids";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
//Connect to the provided endpoint using ApolloClient

const links = [
  { name: "Women", href: "women", element: <Women /> },
  { name: "Men", href: "men", element: <Men /> },
  { name: "Kids", href: "kids", element: <Kids /> },
];
// I tried not to repeat myself, but passing this list as a prop all the way down to Nav component didn't really work.

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
                <Route path={link.href} element={link.element} key={link} />
              );
            })}
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
