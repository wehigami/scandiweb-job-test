import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";
import { Query } from "@apollo/client/react/components";
import { location } from "../lib/location";
import { connect } from "react-redux";
import { setCartIncrement, setCartItem, setCart } from "../redux/cartSlice";
import { setDummyCart, cleanDummyCart } from "../redux/dummyCartSlice";
import Attributes from "../components/buttons/attributes";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: "",
    };
  }

  setCurrentImage = (image) => {
    this.setState({ currentImage: image });
  };

  componentDidUpdate() {}

  render() {
    const labelStyle = {
      fontSize: 18,
      fontWeight: 700,
      textTransform: "uppercase",
      fontFamily: "Roboto",
    };

    let cartClick = (productId, productPrices) => {
      let index = this.props.cart.findIndex((item) => item.id === productId);
      if (this.props.cart[index]) {
        this.props.setCartIncrement(productId);
      } else if (this.props.dummyCart.length > 0) {
        this.props.setCart({
          id: productId,
          price: productPrices.map((price) => {
            return {
              label: price.currency.label,
              amount: price.amount,
            };
          }),
          quantity: 1,
        });
        this.props.dummyCart.forEach((arrayItem) => {
          for (let key in arrayItem) {
            if (arrayItem.hasOwnProperty(key)) {
              this.props.setCartItem([productId, key, arrayItem[key]]);
              console.log(key);
              console.log(arrayItem[key]);
            }
          }
        });
        this.props.cleanDummyCart();
      } else {
        this.props.setCart({
          id: productId,
          price: productPrices.map((price) => {
            return {
              label: price.currency.label,
              amount: price.amount,
            };
          }),
          quantity: 1,
        });
      }
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
                        gridTemplateRows: "610px",
                        margin: "100px",
                        height: "610",
                      }}
                    >
                      <div
                        style={{
                          overflow: "scroll",
                          scrollbarWidth: "none",
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
                              cursor: "pointer",
                            }}
                            key={item}
                            onClick={() => {
                              this.setCurrentImage(item);
                            }}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          marginRight: "100px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={
                            this.state.currentImage.length < 1
                              ? product.gallery[0]
                              : this.state.currentImage
                          }
                          alt="product"
                          style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: 30, marginBottom: 45 }}>
                          <h1 style={{ margin: 0, fontSize: 30 }}>
                            {product.name}
                          </h1>
                          <span>{product.brand}</span>
                        </div>
                        <Attributes
                          productAttributes={product.attributes}
                          productId={product.id}
                          style={{
                            margin: "0 5px 5px 0",
                            cursor: "pointer",
                            marginRight: 12,
                          }}
                          colorStyle={{ width: 32, height: 32 }}
                          otherStyle={{
                            padding: 5,
                            fontWeight: 500,
                            width: 65,
                            height: 45,
                            fontSize: 16,
                          }}
                          labelStyle={labelStyle}
                          productPrices={product.prices}
                        />

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
                        <button
                          onClick={() => cartClick(product.id, product.prices)}
                        >
                          Add to cart
                        </button>
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
  dummyCart: state.dummyCart.dummyCart,
});
const mapDispatchToProps = {
  setCartIncrement,
  setCartItem,
  setCart,
  setDummyCart,
  cleanDummyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
