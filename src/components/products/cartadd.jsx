import React from "react";
import Cart from "../../imgs/Cart.svg";

class CartAdd extends React.Component {
  render() {
    let surfaceStyle = {
      width: 52,
      height: 52,
      background: "#5ECE7B",
      transition: "all 0.3s ease-in-out",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      position: 'absolute',
      zIndex: '2'

    };
    return (
      <>
        <div style={surfaceStyle} className="surface">
          <img
            src={Cart}
            alt="cart"
            style={{
              filter:
                "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(119%)",
            }}
            height="24px"
          />
        </div>
      </>
    );
  }
}

export default CartAdd;
