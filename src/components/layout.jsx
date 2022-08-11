import React from "react";
import Nav from "./nav/nav";
import CartComponent from '../components/cart/cart';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Nav navData={this.props.navData} />
        <section>{this.props.children}</section>
      </div>
    );
  }
}

export default Layout;
