import React from "react";
import { connect } from "react-redux";
import {
  setCart,
} from "../../redux/cartSlice";
import { setDummyCart } from "../../redux/dummyCartSlice";
import "./attributes.css";

class Attributes extends React.Component {
  render() {
    const index = this.props.cart.findIndex(
      (item) => item.id === this.props.cartId
    );

    const style = (itemId, attributeName, attributeId, itemValue) => {
      const stylize = () => {
        let style;
        const styleActive = () =>
          attributeName === "Color"
            ? (style = {border: "2px solid #5ECE7B", })
            : (style = {background: "black", color: "white", });
            
        const dummyIndex = this.props.dummyCart.findIndex(
          (item) => item[attributeId]
        );
  
        if (this.props.inCart) {
          this.props.cart[index].attributes.forEach((attribute) => {
            for (const [key, value] of Object.entries(attribute)) {
              if (attributeId === key && itemId === value) {
                styleActive();
              }
            }
          });
        } else if (
          this.props.dummyCart[dummyIndex] &&
          this.props.dummyCart.length > 0
        ) {
          if (itemId === this.props.dummyCart[dummyIndex][attributeId]) {
            styleActive();
  
          }
        }
        return style;
      };
      
      return attributeName === "Color"
      ? {
          ...stylize(),
          ...this.props.style,
          ...this.props.colorStyle,
          background: itemValue,
        }
      : {
          ...stylize(),
          ...this.props.style,
          ...this.props.basicStyle,
        }
    }

    function inCartclick() {
      return;
    }
    

    return (
      <>
        {this.props.productAttributes.map((attribute) => (
          <div key={attribute.id}>
            <p style={{ ...this.props.labelStyle }}>{attribute.name}:</p>
            {attribute.items.map((item) => (
              <button
                key={item.id}
                style={
                  style(item.id, attribute.name, attribute.id, item.value)
                }
                onClick={() => {
                  this.props.inCart
                    ? inCartclick()
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
  dummyCart: state.dummyCart.dummyCart,
});
const mapDispatchToProps = {
  setCart,
  setDummyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
