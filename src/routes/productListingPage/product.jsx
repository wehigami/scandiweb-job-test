import React from "react";
import { connect } from "react-redux";

class Product extends React.Component {
  render() {
    const wrapperStyle = {
      backgroundImage: `url(${this.props.productImg})`,
      height: 400,
      width: "100%",
      backgroundSize: "cover",
      backgroundPosition: "90% 10%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <>
        <div style={wrapperStyle}>
          {this.props.notInStock ? (
            <span
              style={{
                fontSize: 24,
                textTransform: "uppercase",
              }}
            >
              Out of stock
            </span>
          ) : null}
        </div>

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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
});

export default connect(mapStateToProps)(Product);
