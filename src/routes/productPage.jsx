import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";
import { Query } from "@apollo/client/react/components";
import { location } from "../lib/utils";
import { connect } from "react-redux";
import { setCartIncrement, setCart } from "../redux/cartSlice";
import { clearDummyCart } from "../redux/dummyCartSlice";
import Attributes from "../components/buttons/attributes";
import AddToCart from "../components/buttons/addToCart";
import parse from 'html-react-parser'

const attrStyle = {
  margin: "0 5px 5px 0",
  cursor: "pointer",
  marginRight: 12,
};

const attrBasicStyle = {
  padding: 5,
  fontWeight: 500,
  width: 65,
  height: 45,
  fontSize: 16,
};

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: "",
      clearCart: this.props.clearDummyCart(),
    };
  }

  setCurrentImage = (image) => {
    this.setState({ currentImage: image });
  };

  componentDidMount() {
    return this.state.clearCart;
  }

  render() {
    const uniqueId = this.props.dummyCart
      .map((item) => item[Object.keys(item)[0]])
      .join("-");

    const labelStyle = {
      fontSize: 18,
      fontWeight: 700,
      textTransform: "uppercase",
      fontFamily: "Roboto",
    };



    return (
      <Layout>
        <Query query={getQuery(2)} variables={{ title: "all" }}>
          {({ loading, error, data }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>error :(</p>;
            return (
              <>
                {data.category.products.map((product) =>
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
                          overflowY:
                            product.gallery.length >= 5 ? "scroll" : null,
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
                          productId={product.id + "-" + uniqueId}
                          style={attrStyle}
                          colorStyle={{ width: 32, height: 32 }}
                          basicStyle={attrBasicStyle}
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
                        {/*add to cart goes here */}
                        <AddToCart
                          productId={product.id}
                          productPrices={product.prices}
                          productAttributes={product.attributes}
                          inStock={product.inStock}
                        />
                        <div
                          style={{ fontFamily: "Roboto" }}
                        >
                          {parse(product.description)}
                        </div>
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
  setCart,
  clearDummyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
