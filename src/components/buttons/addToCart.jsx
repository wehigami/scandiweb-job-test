import React from "react";
import { connect } from "react-redux";
import { setCartIncrement, setCart } from "../../redux/cartSlice";
import { clearDummyCart } from "../../redux/dummyCartSlice";

const addToCartStyle = {
  background: "#5ECE7B",
  width: 300,
  height: 50,
  padding: "16px 32px",
  alignItems: "center",
  color: "white",
  textTransform: "uppercase",
  fontSize: 16,
  border: "none",
  cursor: "pointer",
};

class AddToCart extends React.Component {
  componentDidUpdate() {
    console.log(this.props.cart);
  }

  render() {
    const uniqueId = this.props.dummyCart
      .map((item) => item[Object.keys(item)[0]])
      .join("-");

    const cartClick = (productId, productPrices, attributesLen) => {
      const dummyCartSize = this.props.dummyCart.length;
      const productUniqueId = productId + "_" + uniqueId;
      const idIndex = this.props.cart.findIndex(
        (item) => item.id === productUniqueId
      );

      if (this.props.cart[idIndex]) {
        this.props.setCartIncrement([productUniqueId]);
      } else if (dummyCartSize === attributesLen) {
        this.props.setCart({
          id: productUniqueId,
          price: productPrices.map((price) => {
            return {
              label: price.currency.label,
              amount: price.amount,
            };
          }),
          quantity: 1,
          attributes: this.props.dummyCart,
        });
      }
    };
    return (
      <>
        {this.props.inStock ? (
          <button
            onClick={() =>
              cartClick(
                this.props.productId,
                this.props.productPrices,
                this.props.productAttributes.length
              )
            }
            style={addToCartStyle}
          >
            Add to cart
          </button>
        ) : (
          <button
            style={{ ...addToCartStyle, background: "grey", cursor: "default" }}
          >
            Out of Stock
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  dummyCart: state.dummyCart.dummyCart,
});
const mapDispatchToProps = {
  setCartIncrement,
  setCart,
  clearDummyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
