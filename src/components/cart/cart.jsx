import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";
import {
  setCart,
  setCartDecrement,
  setCartPrices,
} from "../../redux/cartSlice";

class Cart extends React.Component {
  render() {
    const uniqueItems = new Set(this.props.cart);

    const btnStyle = {
      alignSelf: "end",
      height: 40,
    };

    const countBtnStyle = {
      border: "1px solid #1D1F22",
      height: "22px",
      width: "22px",
      background: "#fff",
    };

    const itemAmount = (productId) => {
      return this.props.cart.filter((v) => v === productId).length;
    };

    let totalPriceArr = [];
    let totalPrice = 0;

    const itemPrice = (priceAmount, productId) => {
      let price = parseFloat(priceAmount) * itemAmount(productId);
      totalPriceArr.push(price.toFixed(2));
      totalPrice = totalPriceArr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
      return price.toFixed(2);
    };

    return this.props.cartClick ? (
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
          <strong>My Bag.</strong> {this.props.cart.length}{" "}
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
                  overflow: "hidden",
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
                            <p key={price.amount}>
                              <span>{this.props.symbol}</span>
                              <span>{itemPrice(price.amount, product.id)}</span>
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
                          onClick={() => this.props.setCart(product.id)}
                        >
                          +
                        </button>
                        <div
                          style={{
                            justifySelf: "center",
                            alignSelf: "center",
                          }}
                        >
                          {itemAmount(product.id)}
                        </div>
                        <button
                          style={{ ...countBtnStyle, alignSelf: "end" }}
                          onClick={() =>
                            this.props.setCartDecrement(product.id)
                          }
                        >
                          -
                        </button>
                      </div>

                      <div
                        style={{
                          backgroundImage: `url(${product.gallery[0]})`,
                          backgroundSize: "150%",
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
            margin: "20px 0",
          }}
        >
          <p style={{ gridArea: "a" }}>Total</p>
          <p style={{ gridArea: "b", justifySelf: "end" }}>{totalPrice}</p>
          <button style={{ ...btnStyle, gridArea: "c" }}>view bag</button>
          <button style={{ ...btnStyle, gridArea: "d" }}>check out</button>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart.cart,
  cartPrice: state.addToCart.cartPrices,
  cartClick: state.cartClick.cartClicked,
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
});
const mapDispatchToProps = { setCart, setCartDecrement, setCartPrices };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
