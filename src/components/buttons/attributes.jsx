import React from "react";
import { connect } from "react-redux";
import {
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
} from "../../redux/cartSlice";

class Attributes extends React.Component {
  render() {
    //border: "1px solid #1D1F22",

    let style = (itemId, trueStyle, falseStyle) => {
      let style = {};
      let index = this.props.cart.findIndex(
        (item) => item.id === this.props.productId
      );
      for (const [key, value] of Object.entries(this.props.cart[index])) {
        if (itemId === value) {
          console.log(`${key}: ${value}`);
          style = trueStyle;
        } else {
          style = falseStyle;
        }
      }
      return style;
    };

    // this.props.cart.map((item) => {
    //   for (const [key, value] of Object.entries(item)) {
    //     console.log(`${key}: ${value}`);
    //     if(key === attribute.id )
    //   }
    // });
    return (
      <>
        {this.props.productAttributes.map((attribute) => (
          <div key={attribute.id}>
            <p>{attribute.name}:</p>
            {attribute.items.map((item) =>
              attribute.name === "Color" ? (
                <button
                  key={item.id}
                  style={style(
                    item.id,
                    {
                      ...this.props.style,
                      ...this.props.colorStyle,
                      background: item.value,
                      border: "1px solid #5ECE7B",
                    },
                    {
                      ...this.props.style,
                      ...this.props.colorStyle,
                      background: item.value,
                    }
                  )}
                  onClick={() => {
                    this.props.setCartItem([
                      this.props.productId,
                      attribute.id,
                      item.id,
                    ]);
                  }}
                ></button>
              ) : (
                <button
                  key={item.id}
                  style={style(
                    item.id,
                    {
                      ...this.props.style,
                      ...this.props.otherStyle,
                      background: "black",
                      color: "#fff",
                    },
                    {
                      ...this.props.style,
                      ...this.props.otherStyle,
                      background: "#fff",
                    }
                  )}
                  onClick={() => {
                    this.props.setCartItem([
                      this.props.productId,
                      attribute.id,
                      item.id,
                    ]);
                  }}
                >
                  {item.value}
                </button>
              )
            )}
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
});
const mapDispatchToProps = {
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
