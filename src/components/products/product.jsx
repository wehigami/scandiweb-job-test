import React from "react";
import { connect } from "react-redux";
import CartAdd from "./cartadd";
import { setProductHover } from "../../redux/productHoverSlice";

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
      opacity: 1,
    };

    if (this.props.notInStock) {
      mainDivStyle.opacity = 0.5;
    }
    return (
      <div
        key={this.allProps[0]}
        style={mainDivStyle}
        className={this.props.highlightStyle}
        onMouseEnter={() => this.props.setProductHover(true)}
        onMouseLeave={() => this.props.setProductHover(false)}
      >
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
          {this.props.hover ? (
            <div
              className="cart"
              style={{
                gridArea: "end",
                justifySelf: "center",
                alignSelf: "center",
                marginTop: "70px",
              }}
            >
              <CartAdd />
            </div>
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
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  hover: state.productHover.hover,
});

const mapDispatchToProps = { setProductHover };

export default connect(mapStateToProps, mapDispatchToProps)(Product);
