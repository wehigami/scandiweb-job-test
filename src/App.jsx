import React from "react";
import Layout from "./components/layout";

class App extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <p style={{textAlign: 'center'}}>
            This is the main page <br />
            Hello!
          </p>
        </Layout>
      </>
    );
  }
}

export default App;
