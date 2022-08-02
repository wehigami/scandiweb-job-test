import React from "react";
import Layout from "./components/layout";
import { getQuery } from "./lib/queries";
import { connect } from "react-redux";
import { setActiveCurrency } from "./redux/currencySlice";

class App extends React.Component {
  render() {
    return (
      <Layout navData={getQuery(0)}>
        <h1>This is the main page</h1>
        <h1>count is: {this.props.symbol}</h1>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  currency: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
});

const mapDispatchToProps = { setActiveCurrency };
export default connect(mapStateToProps, mapDispatchToProps)(App);
