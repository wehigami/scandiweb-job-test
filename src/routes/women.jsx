import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";
import Products from '../components/products/products'

class Women extends React.Component {

  render() {
    return (
      <Layout navData={getQuery(0)}>
        <Products />
      </Layout>
    );
  }
}

export default Women;
