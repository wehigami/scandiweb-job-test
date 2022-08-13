import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";
import { setCart, setCartDecrement } from "../../redux/cartSlice";

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
      return this.props.cart.filter((v) => v === productId).length
    } 

    return this.props.cartClick ? (
      console.log(typeof this.props.cartPrices),
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
                  uniqueItems.has(product.id)
                    ? (console.log(uniqueItems.size),
                      (
                        <div
                          key={product.id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "0.5fr 0.5fr 1fr",
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
                                    <span>{parseFloat(price.amount) * itemAmount(product.id)}</span>
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
                            <div style={{ justifySelf: "center" }}>
                              {
                                itemAmount(product.id)
                              }
                            </div>
                            <button
                              style={countBtnStyle}
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
                          ></div>
                        </div>
                      ))
                    : null
                )}
              </div>
            );
          }}
        </Query>
        <div
          style={{
            display: "grid",
            gridTemplate: "repeat(2, 1fr) / repeat(2, 1fr)",
            columnGap: 20,
            gridTemplateAreas: "'a b' 'c d'",
            margin: "30px 0",
          }}
        >
          <p style={{ gridArea: "a" }}>Total</p>
          <p style={{ gridArea: "b", justifySelf: "end" }}>200$</p>
          <button style={{ ...btnStyle, gridArea: "c" }}>view bag</button>
          <button style={{ ...btnStyle, gridArea: "d" }}>check out</button>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart.cart,
  cartClick: state.cartClick.cartClicked,
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  cartPrice: state.addToCart.cartPrices,
});
const mapDispatchToProps = { setCart, setCartDecrement };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
