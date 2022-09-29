import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";
import { setCart } from "../../redux/cartSlice";
import CartItem from "./cartItem";
import { before_ } from "../../lib/utils";
import { Link } from "react-router-dom";
import { cartTotal } from "../../lib/utils";
import { setCartClick } from "../../redux/cartClickSlice";
import CartImg from "../../imgs/Cart.svg";
import style from "./cart.module.scss";

const itemWrapperStyle = {
  display: "grid",
  gridTemplateColumns: "0.7fr 0.3fr 1fr",
  columnGap: "10px",
  padding: "10px",
  border: '1px solid red'
};

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapperRef: React.createRef(),
      handleClickOutside: this.handleClickOutside.bind(this),
    };
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.state.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.state.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.state.wrapperRef.current != null) {
      if (
        this.state.wrapperRef &&
        !this.state.wrapperRef.current.contains(event.target)
      ) {
        this.props.setCartClick(false);
      }
    }
  }

  /**
   * Alert if clicked on outside of element
   */

  render() {
    const cartQuantity =
      this.props.cart.length > 0
        ? this.props.cart.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0)
        : null;

    return (
      <div ref={this.state.wrapperRef}>
        <img
          src={CartImg}
          alt="cart"
          width={20}
          style={{ marginLeft: "20px", cursor: "pointer" }}
          onClick={() =>
            this.props.cartClick
              ? this.props.setCartClick(false)
              : this.props.setCartClick(true)
          }
        />
        {this.props.cartClick ? (
          <div className={style.wrapper}>
            <p style={{ marginBottom: "30px" }}>
              <strong>My Bag.</strong>{" "}
              {this.props.cart.length === 0 ? 0 : cartQuantity}{" "}
              {this.props.cart.length === 1 ? "item" : "items"}
            </p>

            <Query query={getQuery(2)} variables={{ title: "all" }}>
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
                            style={{
                              margin: "0 5px 5px 0",
                            }}
                            colorStyle={{ width: 16, height: 16 }}
                            basicStyle={{ padding: 5, fontWeight: 500 }}
                            wrapperStyle={itemWrapperStyle}
                          />
                        ) : null
                      )
                    )}
                  </div>
                );
              }}
            </Query>
            <div className={style.footer}>
              <p style={{ gridArea: "a", fontWeight: 600 }}>Total</p>
              <p
                style={{
                  gridArea: "b",
                  justifySelf: "end",
                  fontWeight: 600,
                  marginBottom: 30,
                }}
              >
                {this.props.symbol}
                {cartTotal(this.props.cart, this.props.label)}
              </p>

              <Link to={`/cart`}>
                <button
                  className={style.button}
                  style={{
                    gridArea: "c",
                    background: "#fff",
                    border: "1px solid #1D1F22",
                  }}
                >
                  view bag
                </button>
              </Link>

              <Link to="#">
                <button
                  className={style.button}
                  style={{
                    gridArea: "d",
                    background: "#5ECE7B",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  check out
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    );
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
  setCartClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// TODO - change css on click of button to change color of button
