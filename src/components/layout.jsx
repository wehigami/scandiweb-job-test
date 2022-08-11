import React from "react";
import Nav from "./nav/nav";
import CartComponent from "../components/cart/cart";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Nav navData={this.props.navData} />
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <CartComponent />
        </div>
        <section>{this.props.children}</section>
      </div>
    );
  }
}

export default Layout;
