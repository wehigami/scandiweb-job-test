import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";
import { Query } from "@apollo/client/react/components";
import { location } from "../lib/location";
import { connect } from "react-redux";
import {
  setCartDecrement,
  setCartIncrement,
  setCartSplice,
  setCartItem,
} from "../redux/cartSlice";

class ProductPage extends React.Component {
  // componentDidMount() {
  //   console.log(this.props.cart);
  // }
  // componentDidUpdate() {
  //   console.log(this.props.cart);
  // }
  render() {
    const labelStyle = {
      fontSize: 18,
      fontWeight: 700,
      textTransform: "uppercase",
      fontFamily: "Roboto",
    };

    const attrButtonStyle = {
      border: "1px solid #1D1F22",
      marginRight: 12,
      fontSize: 16,
    };
    return (
      <Layout>
        <Query query={getQuery(1)}>
          {({ loading, error, data }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>error :(</p>;
            return (
              <>
                {data.categories[0].products.map((product) =>
                  location() === product.id ? (
                    <div
                      key={product.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "0.1fr 0.5fr 0.4fr",
                        margin: "100px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {product.gallery.map((item) => (
                          <div
                            style={{
                              backgroundImage: `url(${item})`,
                              height: "100px",
                              width: "100px",
                              backgroundSize: "cover",
                              marginBottom: 30,
                            }}
                            key={item}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          backgroundImage: `url(${product.gallery[0]})`,
                          marginRight: "100px",
                          height: 610,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div>
                        <div style={{ fontSize: 30, marginBottom: 45 }}>
                          <h1 style={{ margin: 0, fontSize: 30 }}>
                            {product.name}
                          </h1>
                          <span>{product.brand}</span>
                        </div>

                        {product.attributes.map((attribute) => (
                          <div key={attribute.id}>
                            <p style={labelStyle}>{attribute.name}:</p>
                            {attribute.items.map((item) =>
                              attribute.name === "Color" ? (
                                <button
                                  key={item.id}
                                  style={{
                                    ...attrButtonStyle,
                                    width: 32,
                                    height: 32,
                                    background: item.value,
                                  }}
                                  onClick={() => {
                                    this.props.setCartItem([
                                      product.id,
                                      attribute.id,
                                      item.id,
                                    ]);
                                  }}
                                ></button>
                              ) : (
                                <button
                                  key={item.id}
                                  style={{
                                    ...attrButtonStyle,
                                    width: 65,
                                    height: 45,
                                    background: "none",
                                  }}
                                  onClick={() => {
                                    this.props.setCartItem([
                                      product.id,
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

                        <p
                          style={{
                            ...labelStyle,
                            marginTop: 36,
                          }}
                        >
                          Price:
                        </p>
                        {product.prices.map((price) => (
                          <div key={price.amount}>
                            {this.props.label === price.currency.label ? (
                              <p style={{ fontWeight: 700, fontSize: 24 }}>
                                <span>{this.props.symbol}</span>
                                <span>{price.amount}</span>
                              </p>
                            ) : null}
                          </div>
                        ))}
                        <button>Add to cart</button>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                          style={{ fontFamily: "Roboto" }}
                        ></p>
                      </div>
                    </div>
                  ) : null
                )}
              </>
            );
          }}
        </Query>
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
