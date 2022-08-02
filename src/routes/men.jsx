import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";

class Men extends React.Component {
  render() {
    return <Layout navData={getQuery(0)}></Layout>;
  }
}

export default Men;
