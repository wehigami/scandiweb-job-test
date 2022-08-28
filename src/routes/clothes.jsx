import React from "react";
import Layout from "../components/layout";
import Products from "../components/products/productListingPage";

class Men extends React.Component {
  render() {
    return (
      <Layout>
        <Products />
      </Layout>
    );
  }
}

export default Men;
