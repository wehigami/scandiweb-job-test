import React from "react";
import Nav from "./nav/nav";
import CartComponent from "../components/cart/cart";
import { connect } from "react-redux";

class Layout extends React.Component {
  render() {
    return (
      <div>
        {this.props.cartClick ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.3)",
              position: "fixed",
              zIndex: "2",
            }}
          />
        ) : null}
        <Nav navData={this.props.navData} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CartComponent />
        </div>
        <section>{this.props.children}</section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartClick: state.cartClick.cartClicked,
});

export default connect(mapStateToProps)(Layout);
