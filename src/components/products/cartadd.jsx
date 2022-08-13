import React from "react";
import Cart from "../../imgs/Cart.svg";
import { connect } from "react-redux";
import { setCart, setCartPrices } from "../../redux/cartSlice";

class CartAdd extends React.Component {
  render() {
    let surfaceStyle = {
      width: 52,
      height: 52,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      position: 'absolute',
      zIndex: '2',
      background: '#5ECE7B',
    };

    return (
      <div>
        <div style={surfaceStyle} className="surface" onClick={() => {
          this.props.setCart(this.props.productId)
          this.props.setCartPrices(this.props.productPrice)
          }}>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart.cart
});

const mapDispatchToProps = { setCart, setCartPrices };


export default connect(mapStateToProps, mapDispatchToProps)(CartAdd);
