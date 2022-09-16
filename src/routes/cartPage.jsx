import React from "react";
import Layout from "../components/layout";
import { Query } from "@apollo/client/react/components";
import { setCart } from "../redux/cartSlice";
import { getQuery } from "../lib/queries";
import { connect } from "react-redux";
import { before_ } from "../lib/utils";
import CartItem from "../components/cart/cartItem";
import { cartTotal } from "../lib/utils";
import style from './cartPage.module.scss'

const itemWrapperStyle = {
  display: "grid",
  gridTemplateColumns: "0.8fr 0.1fr 0.1fr",
  columnGap: "10px",
  borderTop: "1px solid #E5E5E5",
  padding: "25px 0",
  fontSize: 24,
};

const itemBasicStyle = {
  height: 45,
  width: 60,
  marginRight: 10,
  fontSize: 16,
};

const itemLabelStyle = {
  fontSize: 18,
  fontWeight: 700,
  textTransform: "uppercase",
  fontFamily: "Roboto",
};

class CartPage extends React.Component {
  render() {
    const uniqueItems = new Set(this.props.cart.map((item) => item.id));
    const tax = (
      (cartTotal(this.props.cart, this.props.label) / 100) *
      21
    ).toFixed(2);
    return (
      <Layout>
        <div
          style={{
            margin: "50px 100px",
          }}
        >
          <h1
            style={{
              fontWeight: 700,
              fontSize: 32,
              textTransform: "uppercase",
            }}
          >
            Cart
          </h1>
          <Query query={getQuery(2)} variables={{title: 'all'}}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <>
                  {data.category.products.map((product) =>
                    this.props.cart.map((object) =>
                      before_(object.id) === product.id ? (
                        <CartItem
                          cartId={object.id}
                          productName={product.name}
                          productPrices={product.prices}
                          productAttributes={product.attributes}
                          productGallery={product.gallery}
                          productBrand={product.brand}
                          key={object.id}
                          wrapperStyle={itemWrapperStyle}
                          productNameStyle={{ fontSize: 30, fontWeight: 600 }}
                          productBrandStyle={{ fontSize: 30 }}
                          basicStyle={itemBasicStyle}
                          colorStyle={{
                            height: 35,
                            width: 35,
                            marginRight: 10,
                          }}
                          labelStyle={itemLabelStyle}
                        />
                      ) : null
                    )
                  )}
                </>
              );
            }}
          </Query>
          <div
            style={{
              fontSize: 24,
              borderTop: "1px solid #E5E5E5",
              paddingTop: 25,
            }}
          >
            <p style={{ margin: 0 }}>
              Tax 21%: <strong>{`${this.props.symbol}${tax}`}</strong>
            </p>
            <p style={{ margin: "10px 0" }}>
              Quantity: <strong>{uniqueItems.size}</strong>
            </p>
            <p style={{ margin: 0 }}>
              Total:{" "}
              <strong>
                {`${this.props.symbol}${cartTotal(
                  this.props.cart,
                  this.props.label
                )}`}
              </strong>
            </p>
          </div>
          <button className={style.orderBtn}>
            order
          </button>
        </div>
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
  setCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
