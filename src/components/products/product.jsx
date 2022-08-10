import React from "react";
import { connect } from "react-redux";

class Product extends React.Component {
  allProps = [
    this.props.productId,
    this.props.productImg,
    this.props.productName,
    this.props.productPrices,
    this.props.highlightStyle,
  ];

  render() {

    return (
      <>

          <div
            style={{
              backgroundImage: `url(${this.allProps[1]})`,
              height: 400,
              width: "auto",
              backgroundSize: "cover",
              backgroundPosition: "90% 10%",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gridTemplateAreas: "'a a a' 'b center d' 'v v end'",
            }}
          >
            {this.props.notInStock ? (
              <span
                style={{
                  fontSize: 24,
                  textTransform: "uppercase",
                  gridArea: "center",
                  justifySelf: "center",
                  alignSelf: "center",
                }}
              >
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
      </>
      
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  hover: state.productHover.hover,
});


export default connect(mapStateToProps)(Product);
