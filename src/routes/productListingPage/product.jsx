import React from "react";
import { connect } from "react-redux";
import CartAdd from "./cartadd";
import { Link } from "react-router-dom";
import style from "./product.module.scss";

class Product extends React.Component {
  render() {
    return (
      <div className={style.wrapper}>
        {this.props.hover && this.props.productsId === this.props.productId ? (
          <div className={style.cart}>
            {this.props.inStock ? (
              <>
                <CartAdd
                  productId={this.props.productId}
                  productPrices={this.props.productPrices.map((price) => {
                    return {
                      label: price.currency.label,
                      amount: price.amount,
                    };
                  })}
                  productAttributes={this.props.productAttributes.map(
                    (attribute) => {
                      return {
                        [attribute.id]: attribute.items[0].id,
                      };
                    }
                  )}
                />
              </>
            ) : null}
          </div>
        ) : null}

        <Link
          to={`/product/${this.props.productId}`}
          style={{
            color: "#1D1F22",
          }}
          className={style.productWrapper}
          key={this.props.productId}
        >
          {this.props.inStock ? null : (
            <p
              style={{
                position: "absolute",
                marginTop: "160px",
                alignSelf: "center",
                textTransform: "uppercase",
                weight: 400,
                fontSize: 24
              }}
            >
              Out of Stock
            </p>
          )}
          <img
            src={this.props.productImg}
            alt="product"
            className={style.productImg}
          />

          <div>
            <h3 style={{ fontWeight: 400 }}>
              {this.props.productName} {this.props.productBrand}
            </h3>
            {this.props.productPrices.map((price) => (
              <div key={price.amount}>
                {this.props.label === price.currency.label ? (
                  <p style={{ fontWeight: 500 }}>
                    <span>{this.props.symbol}</span>
                    <span>{price.amount}</span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  hover: state.productHover.hover,
  productsId: state.productHover.productId,
});

export default connect(mapStateToProps)(Product);
