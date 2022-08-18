import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";
import {
  setCart,
  setCartDecrement,
  setCartIncrement,
  setCartPrices,
  setCartPricesRemove,
  setCartSplice,
} from "../../redux/cartSlice";

class Cart extends React.Component {
  render() {
    const btnStyle = {
      alignSelf: "end",
      height: 45,
      textTransform: "uppercase",
      fontWeight: 600,
    };

    const countBtnStyle = {
      border: "1px solid #1D1F22",
      height: "22px",
      width: "22px",
      background: "#fff",
    };

    const uniqueItems = new Set(this.props.cart.map((item) => item.id));

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

    const cartQuantity =
      this.props.cart.length > 0
        ? this.props.cart.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0)
        : null;

    
    const cartTotal = this.props.cart.forEach((item) => {
      let total = 0;
      let index = item.price.findIndex(
        (priceItem) => priceItem.label === this.props.label
      );
      return total + parseFloat(item.price[index].amount).toFixed(2);
    });

    return this.props.cartClick
      ? (console.log(this.props.cart[0]),
        (
          <div
            style={{
              height: 650,
              width: 300,
              background: "#fff",
              position: "absolute",
              zIndex: "3",
              marginRight: 100,
              overflow: "hidden",
              display: "grid",
              gridTemplateRows: "0.1fr 1.5fr 0.2fr",
              padding: 15,
            }}
          >
            <p style={{ marginBottom: "30px" }}>
              <strong>My Bag.</strong>{" "}
              {this.props.cart.length === 0 ? 0 : cartQuantity}{" "}
              {this.props.cart.length === 1 ? "item" : "items"}
            </p>

            <Query query={getQuery(1)}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                return (
                  <div
                    style={{
                      height: "100%",
                      overflow: "scroll",
                      scrollbarWidth: "none",
                    }}
                  >
                    {data.categories[0].products.map((product) =>
                      uniqueItems.has(product.id) ? (
                        <div
                          key={product.id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "0.7fr 0.3fr 1fr",
                            columnGap: "10px",
                            padding: "10px",
                            height: 190,
                          }}
                        >
                          <div>
                            <p>{product.name}</p>
                            {product.prices.map((price) =>
                              this.props.label === price.currency.label ? (
                                <p
                                  key={price.amount}
                                  style={{ fontWeight: 600 }}
                                >
                                  <span>{this.props.symbol}</span>
                                  <span>{itemPrice(cart(product.id))}</span>
                                </p>
                              ) : null
                            )}
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
                                this.props.setCartIncrement(product.id);
                                this.props.setCartPrices(
                                  product.prices
                                    .filter(
                                      (price) =>
                                        this.props.label ===
                                        price.currency.label
                                    )
                                    .map((price) => price.amount)
                                );
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
                              {cart(product.id).quantity}
                            </div>
                            <button
                              style={{ ...countBtnStyle, alignSelf: "end" }}
                              onClick={() => {
                                cart(product.id).quantity === 1
                                  ? this.props.setCartSplice(product.id)
                                  : this.props.setCartDecrement(product.id);
                                this.props.setCartPricesRemove(
                                  product.prices
                                    .filter(
                                      (price) =>
                                        this.props.label ===
                                        price.currency.label
                                    )
                                    .map((price) => price.amount)
                                );
                              }}
                            >
                              -
                            </button>
                          </div>

                          <div
                            style={{
                              backgroundImage: `url(${product.gallery[0]})`,
                              backgroundSize: "170%",
                              backgroundPosition: "center",
                            }}
                          />
                        </div>
                      ) : null
                    )}
                  </div>
                );
              }}
            </Query>
            <div
              style={{
                display: "grid",
                gridTemplate: "repeat(2, 1fr) / repeat(2, 1fr)",
                columnGap: 10,
                gridTemplateAreas: "'a b' 'c d'",
                margin: "30px 0",
              }}
            >
              <p style={{ gridArea: "a", fontWeight: 600 }}>Total</p>
              <p style={{ gridArea: "b", justifySelf: "end", fontWeight: 600 }}>
                {this.props.symbol}
                {"x"}
              </p>
              <button
                style={{
                  ...btnStyle,
                  gridArea: "c",
                  background: "#fff",
                  border: "1px solid #1D1F22",
                }}
              >
                view bag
              </button>
              <button
                style={{
                  ...btnStyle,
                  gridArea: "d",
                  background: "#5ECE7B",
                  color: "#fff",
                  border: "none",
                }}
              >
                check out
              </button>
            </div>
          </div>
        ))
      : null;
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart.cart,
  cartPrice: state.addToCart.cartPrices,
  cartClick: state.cartClick.cartClicked,
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
});
const mapDispatchToProps = {
  setCart,
  setCartDecrement,
  setCartPrices,
  setCartPricesRemove,
  setCartIncrement,
  setCartSplice,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
