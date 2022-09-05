import "./index.scss";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import ProductPage from "./routes/productPage";
import Plp from "./routes/productListingPage/productListingPage";
import App from "./App";
import CartPage from "./routes/cartPage";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
//Connect to the provided endpoint using ApolloClient

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product-listing-page">
              <Route path=":listingId" element={<Plp />} />
            </Route>
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
