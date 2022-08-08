import React from "react";
import Cart from "../../imgs/Cart.svg";
import Surface from "../../imgs/Surface.png";

class CartAdd extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <img
          src={Cart}
          alt="cart"
          style={{
            position: "absolute",
            height: 24,
            filter:
              "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(119%)",
            bottom: 14,
          }}
        />
        <img src={Surface} alt="green circle" style={{ width: 52, height: 'auto'}} />
      </div>
    );
  }
}

export default CartAdd;
