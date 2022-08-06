import React from "react";
import style from "./products.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Product extends React.Component {
  allProps = [
    this.props.productId,
    this.props.productImg,
    this.props.productName,
    this.props.productPrices,
    this.props.highlightStyle,
  ];

  render() {
    const mainDivStyle = {
      background: "#fff",
      height: "500px",
      margin: 40,
      padding: 15,
      zIndex: 1,
    };

    const opacityStyle = {
      opacity: 1,
    }

    if (this.props.notInStock) {
      opacityStyle.opacity = 0.5;
    }
    return (
      <div
        key={this.allProps[0]}
        style={mainDivStyle}
        className={this.props.highlightStyle}
      >
        <div style={opacityStyle}>
          <div
            style={{
              backgroundImage: `url(${this.allProps[1]})`,
              height: 400,
              width: "auto",
              backgroundSize: "cover",
              backgroundPosition: "90% 10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.props.notInStock ? (
              <span style={{ fontSize: 24, textTransform: "uppercase" }}>
                Out of stock
              </span>
            ) : null}
          </div>

          <h3 style={{ fontWeight: 400 }}>{this.allProps[2]}</h3>
          {this.allProps[3].map((price) => (
            <div key={price.amount}>
              {this.props.label === price.currency.label ? (
                <p style={{ fontWeight: 600 }}>
                  <span>{this.props.symbol}</span>
                  <span>{price.amount}</span>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

/*

<div
                              key={product.id}
                              style={{
                                background: "#fff",
                                height: "500px",
                                margin: 40,
                                padding: 15,
                              }}
                              className={style.productHighlight}
                            >
                              <Link
                                to={`products/${product.id}`}
                                style={{ color: "#1D1F22" }}
                              >
                                <div
                                  style={{
                                    backgroundImage: `url(${product.gallery[0]})`,
                                    height: 400,
                                    width: "auto",
                                    backgroundSize: "cover",
                                    backgroundPosition: "90% 10%",
                                  }}
                                ></div>
                                <h3 style={{ fontWeight: 400 }}>
                                  {product.name}
                                </h3>
                                {product.prices.map((price) => (
                                  <div key={price.amount}>
                                    {this.props.label ===
                                    price.currency.label ? (
                                      <p style={{ fontWeight: 600 }}>
                                        <span>{this.props.symbol}</span>
                                        <span>{price.amount}</span>
                                      </p>
                                    ) : null}
                                  </div>
                                ))}
                              </Link>
                            </div>
*/

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
});

export default connect(mapStateToProps)(Product);
