import React from "react";
import Nav from "./nav/nav";
import CartComponent from "../components/cart/cart";
import { setCartClick } from "../redux/cartClickSlice";
import { connect } from "react-redux";

class Layout extends React.Component {
  render() {
    const darkenOverlay = () => {
      const ovStyle = {
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.3)",
        position: "fixed",
        zIndex: "3",
      };

      if (this.props.cartClick) {
        return <div style={ovStyle} onClick={() => this.props.setCartClick()} />;
      }
    };
    return (
      <div>
        {darkenOverlay()}
        <Nav />
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

const mapDispatchToProps = { setCartClick };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
