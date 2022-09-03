import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";
import { Query } from "@apollo/client/react/components";
import { location } from "../lib/location";
import { connect } from "react-redux";
import { setCartIncrement, setCartItem, setCart } from "../redux/cartSlice";
import { setDummyCart, cleanDummyCart } from "../redux/dummyCartSlice";
import Attributes from "../components/buttons/attributes";

//TODO:

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: "",
      clearCart: this.props.cleanDummyCart(),
      dummyCopy: [],
    };
  }

  setCurrentImage = (image) => {
    this.setState({ currentImage: image });
  };

  componentDidMount() {
    return this.state.clearCart;
  }

  render() {
    const labelStyle = {
      fontSize: 18,
      fontWeight: 700,
      textTransform: "uppercase",
      fontFamily: "Roboto",
    };

    let cartClick = (productId, productPrices, attributesLen) => {
      this.setState({ dummyCopy: this.props.dummyCart });
      let dummyCartSize = this.props.dummyCart.length;
      let idIndex = this.props.cart.findIndex((item) => item.id === productId);
      if (this.props.cart[idIndex] === true) {
          this.props.setCartIncrement(productId);
      } else if (dummyCartSize === attributesLen) {
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
        this.props.setCartItem([productId, "attributes", this.props.dummyCart]);
        this.props.cleanDummyCart();
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
                          overflowY: "scroll",
                          direction: "rtl",
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
                          onClick={() =>
                            cartClick(
                              product.id,
                              product.prices,
                              product.attributes.length
                            )
                          }
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
