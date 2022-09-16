import React from "react";
import { connect } from "react-redux";
import {
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
} from "../../redux/cartSlice";
import Attributes from "../buttons/attributes";
import style from './cartItem.module.scss';

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
        <div key={this.props.cartId} style={{ ...this.props.wrapperStyle }}>
          <div>
            <p style={this.props.productNameStyle}>{this.props.productName}</p>
            <span style={this.props.productBrandStyle}>
              {this.props.productBrand}
            </span>

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
              style={this.props.style}
              colorStyle={this.props.colorStyle}
              basicStyle={this.props.basicStyle}
              productPrices={this.props.productPrices}
              labelStyle={this.props.labelStyle}
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
              className={style.countBtn}
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
            className={style.countBtn}
              style={{alignSelf: "end" }}
              onClick={() => {
                this.props.cart[idIndex].quantity === 1
                  ? this.props.setCartSplice([this.props.cartId])
                  : this.props.setCartDecrement([this.props.cartId]);
              }}
            >
              -
            </button>
          </div>

          <div style={{alignSelf: 'center'}}>
            <img
              src={this.props.productGallery[0]}
              alt="product"
              width="100%"
            />
          </div>
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
