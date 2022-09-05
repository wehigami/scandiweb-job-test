import React from "react";
import { connect } from "react-redux";
import {
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
} from "../../redux/cartSlice";
import Attributes from "../buttons/attributes";

const countBtnStyle = {
  border: "1px solid #1D1F22",
  height: "22px",
  width: "22px",
  background: "#fff",
  cursor: "pointer",
};

const wrapperStyle = {
  display: "grid",
  gridTemplateColumns: "0.7fr 0.3fr 1fr",
  columnGap: "10px",
  padding: "10px",
}


class cartItem extends React.Component {
  render() {
    const idIndex = this.props.cart.findIndex(
      (item) => item.id === this.props.cartId
    );

    const itemPrice = () => {
      const labelIndex = this.props.cart[idIndex].price.findIndex(
        (item) => item.label === this.props.label
      );
      const price = (
        parseFloat(this.props.cart[idIndex].price[labelIndex].amount) *
        this.props.cart[idIndex].quantity
      ).toFixed(2);
      return price;
    };

    return (
      <>
        <div
          key={this.props.cartId}
          style={wrapperStyle}
        >
          <div>
            <p>{this.props.productName}</p>
            <p>{this.props.productBrand}</p>

            {this.props.productPrices.map((price) =>
              this.props.label === price.currency.label ? (
                <p key={price.amount} style={{ fontWeight: 600 }}>
                  <span>{this.props.symbol}</span>
                  <span>{itemPrice(this.props.cart[idIndex])}</span>
                </p>
              ) : null
            )}

            <Attributes
              productAttributes={this.props.productAttributes}
              cartId={this.props.cartId}
              style={{
                margin: "0 5px 5px 0",
              }}
              colorStyle={{ width: 16, height: 16 }}
              basicStyle={{ padding: 5, fontWeight: 500 }}
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
                this.props.setCartIncrement([this.props.cartId]);
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
              {this.props.cart[idIndex].quantity}
            </div>
            <button
              style={{ ...countBtnStyle, alignSelf: "end" }}
              onClick={() => {
                this.props.cart[idIndex].quantity === 1
                  ? this.props.setCartSplice([this.props.cartId])
                  : this.props.setCartDecrement([this.props.cartId]);
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
