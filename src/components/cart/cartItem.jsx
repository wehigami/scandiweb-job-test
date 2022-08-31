import React from "react";
import { connect } from "react-redux";
import {
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
} from "../../redux/cartSlice";
import Attributes from "../buttons/attributes";

// allProps = [productID, productName, productPrices, productAttributes, productGallery]

class cartItem extends React.Component {
  render() {
    const countBtnStyle = {
      border: "1px solid #1D1F22",
      height: "22px",
      width: "22px",
      background: "#fff",
      cursor: "pointer",
    };

    const itemPrice = (cart) => {
      let index = cart.price.findIndex(
        (item) => item.label === this.props.label
      );
      let price = (
        parseFloat(cart.price[index].amount) * cart.quantity
      ).toFixed(2);
      return price;
    };

    const cart = (productId) => {
      let index = this.props.cart.findIndex((item) => item.id === productId);
      return this.props.cart[index];
    };
    return (
      <>
        <div
          key={this.props.productId}
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 0.3fr 1fr",
            columnGap: "10px",
            padding: "10px",
          }}
        >
          <div>
            <p>{this.props.productName}</p>
            <p>{this.props.productBrand}</p>

            {this.props.productPrices.map((price) =>
              this.props.label === price.currency.label ? (
                <p key={price.amount} style={{ fontWeight: 600 }}>
                  <span>{this.props.symbol}</span>
                  <span>{itemPrice(cart(this.props.productId))}</span>
                </p>
              ) : null
            )}

            <Attributes
              productAttributes={this.props.productAttributes}
              productId={this.props.productId}
              style={{
                margin: "0 5px 5px 0",
                cursor: "pointer",
              }}
              colorStyle={{ width: 16, height: 16 }}
              otherStyle={{ padding: 5, fontWeight: 500, }}
              productPrices={this.props.productPrices}
              inCart
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)",
              fontWeight: 600,
              justifyContent: "center",
            }}
          >
            <button
              style={countBtnStyle}
              onClick={() => {
                this.props.setCartIncrement(this.props.productId);
              }}
            >
              +
            </button>
            <div
              style={{
                justifySelf: "center",
                alignSelf: "center",
              }}
            >
              {cart(this.props.productId).quantity}
            </div>
            <button
              style={{ ...countBtnStyle, alignSelf: "end" }}
              onClick={() => {
                cart(this.props.productId).quantity === 1
                  ? this.props.setCartSplice(this.props.productId)
                  : this.props.setCartDecrement(this.props.productId);
              }}
            >
              -
            </button>
          </div>

          <div
            style={{
              backgroundImage: `url(${this.props.productGallery[0]})`,
              backgroundSize: "300%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(cartItem);
