import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";
import { setCart } from "../../redux/cartSlice";
import CartItem from "./cartItem";
import { before_ } from "../../lib/utils";

const wrapperStyle = {
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
}

const btnStyle = {
  alignSelf: "end",
  height: 45,
  textTransform: "uppercase",
  fontWeight: 600,
};

const cartFooterStyle = {
  display: "grid",
  gridTemplate: "repeat(2, 1fr) / repeat(2, 1fr)",
  columnGap: 10,
  gridTemplateAreas: "'a b' 'c d'",
  margin: "30px 0",
}

class Cart extends React.Component {
  render() {

    const cartQuantity =
      this.props.cart.length > 0
        ? this.props.cart.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0)
        : null;

    const cartTotal = () => {
      let total = 0;
      this.props.cart.forEach((item) => {
        let index = item.price.findIndex(
          (priceItem) => priceItem.label === this.props.label
        );
        total += item.price[index].amount * item.quantity;
      });
      return total.toFixed(2);
    };


    return this.props.cartClick ? (
      <div
        style={wrapperStyle}
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
                  this.props.cart.map((object) =>
                    before_(object.id) === product.id ? (
                      console.log(object.id),
                      <CartItem
                        cartId={object.id}
                        productName={product.name}
                        productPrices={product.prices}
                        productAttributes={product.attributes}
                        productGallery={product.gallery}
                        productBrand={product.brand}
                        key={object.id}
                      />
                    ) : null
                  )
                )}
              </div>
            );
          }}
        </Query>
        <div
          style={cartFooterStyle}
        >
          <p style={{ gridArea: "a", fontWeight: 600 }}>Total</p>
          <p style={{ gridArea: "b", justifySelf: "end", fontWeight: 600 }}>
            {this.props.symbol}
            {cartTotal()}
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
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  cartClick: state.cartClick.cartClicked,
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
});
const mapDispatchToProps = {
  setCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// TODO - change css on click of button to change color of button
