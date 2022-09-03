import React from "react";
import { connect } from "react-redux";
import {
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
  setCart,
  setCartAttributes
} from "../../redux/cartSlice";
import { setDummyCart } from "../../redux/dummyCartSlice";
import "./attributes.css";

class Attributes extends React.Component {

  render() {
    //border: "1px solid #1D1F22",
    let index = this.props.cart.findIndex(
      (item) => item.id === this.props.productId
    );

    let style = (itemId, attributeName, attributeId) => {
      let style;
      let dummyIndex = this.props.dummyCart.findIndex(
        (item) => item[attributeId]
      );

      if (this.props.inCart) {
        if (this.props.cart[index]) {
          this.props.cart[index].attributes.forEach((attribute) => {
            for(const [key, value] of Object.entries(attribute)) {
              if (attributeId === key && itemId === value) {
                attributeName === "Color"
                  ? (style = { border: "2px solid #5ECE7B" })
                  : (style = { background: "black", color: "white" });
              }     
            }
          })  
        }
      } else {
        if (
          this.props.dummyCart[dummyIndex] &&
          this.props.dummyCart.length > 0
        ) {
          if (itemId === this.props.dummyCart[dummyIndex][attributeId]) {
            attributeName === "Color"
              ? (style = { border: "2px solid #5ECE7B" })
              : (style = { background: "black", color: "white" });
          }
        }
      }
      return style;
    };

    return (
      <>
        {this.props.productAttributes.map((attribute) => (
          <div key={attribute.id}>
            <p style={{ ...this.props.labelStyle }}>{attribute.name}:</p>
            {attribute.items.map((item) => (
              <button
                key={item.id}
                style={
                  attribute.name === "Color"
                    ? {
                        ...style(item.id, attribute.name, attribute.id),
                        ...this.props.style,
                        ...this.props.colorStyle,
                        background: item.value,
                      }
                    : {
                        ...style(item.id, attribute.name, attribute.id),
                        ...this.props.style,
                        ...this.props.otherStyle,
                      }
                }
                onClick={() => {
                  this.props.inCart
                    ? this.props.setCartAttributes([this.props.productId, attribute.id, item.id])
                    : this.props.setDummyCart([attribute.id, item.id]);
                }}
              >
                {attribute.name === "Color" ? null : item.value}
              </button>
            ))}
          </div>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  dummyCart: state.dummyCart.dummyCart,
  dummyMiniCart: state.dummyCart.dummyMiniCart,
});
const mapDispatchToProps = {
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
  setCart,
  setDummyCart,
  setCartAttributes
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
