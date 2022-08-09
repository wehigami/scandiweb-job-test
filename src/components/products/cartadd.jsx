import React from "react";
import Cart from "../../imgs/Cart.svg";
import Surface from "../../imgs/Surface.png";
import style from "./products.module.scss";

class CartAdd extends React.Component {
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            zIndex: 2,
            position: "absolute",
            background: "red",
          }}
          className={style.cartHighlight}
        >
          <img
            src={Cart}
            alt="cart"
            style={{
              position: "absolute",
              filter:
                "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(119%)",
              bottom: "25%",
            }}
            height="24px"
          />
          <div
            style={{
              width: 52,
              height: 52,
              background: "#5ECE7B",
              borderRadius: "50%",
            }}
          />
        </div>
      </>
    );
  }
}

export default CartAdd;
