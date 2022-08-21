import React from "react";
import Cart from "../../imgs/Cart.svg";
import { connect } from "react-redux";
import {
  setCart,
  setCartIncrement,
} from "../../redux/cartSlice";

class CartAdd extends React.Component {
  render() {
    let surfaceStyle = {
      width: 52,
      height: 52,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      position: "absolute",
      zIndex: "2",
      background: "#5ECE7B",
    };

    let cartClick = () => {
      if (this.props.cart.length === 0) {
        this.props.setCart({
          id: this.props.productId,
          price: this.props.productPrices,
          quantity: 1,
        });
      } else {
        if (
          this.props.cart[
            this.props.cart.findIndex(
              (item) => item.id === this.props.productId
            )
          ]
        ) {
          this.props.setCartIncrement(this.props.productId);
        } else {
          this.props.setCart({
            id: this.props.productId,
            price: this.props.productPrices,
            quantity: 1,
          });
        }
      }
    };


    return (
      <div>
        <div
          style={surfaceStyle}
          className="surface"
          onClick={() => {
            cartClick();
          }}
        >
          <img
            src={Cart}
            alt="cart"
            style={{
              filter:
                "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(119%)",
              userSelect: "none",
            }}
            height="24px"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart.cart,
});

const mapDispatchToProps = { setCart, setCartIncrement };

export default connect(mapStateToProps, mapDispatchToProps)(CartAdd);
