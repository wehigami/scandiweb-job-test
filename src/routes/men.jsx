import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";

class Men extends React.Component {
  render() {
    return (
      <Layout navData={getQuery(0)}>
        in the design everything was placed on the "women" page, so I did the
        same. Category name works as a dropdown, since there was supposed to be
        the option of choosing the category and I'm pretty sure it still is the
        display of needed skills.
      </Layout>
    );
  }
}

export default Men;
