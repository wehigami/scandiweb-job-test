import React from "react";
import Layout from "./components/layout";
import { getQuery } from "./lib/queries";


class App extends React.Component {
  render() {

    return (
      <Layout navData={getQuery(0)}>
        <h1>This is the main page</h1>
      </Layout>
    );
  }
}

export default App;
