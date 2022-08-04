import React from "react";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { setActiveCurrency } from "../../redux/currencySlice";
import { setActiveCategory } from "../../redux/categorySlice";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/dropdown";
import style from "./products.module.scss";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
    };
  }

  handleClick = () => {
    this.setState({ dropdownActive: !this.state.dropdownActive });
  };
  render() {
    
    const categoriesQuery = (
      <Query query={getQuery(0)}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <>
              {data.currencies.map((currency) => (
                <p
                  key={currency.symbol}
                  style={{
                    margin: 0,
                    padding: 0,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  onClick={() => {
                    this.props.setActiveCurrency([
                      currency.symbol,
                      currency.label,
                    ]);

                    this.handleCurrencyClick();
                  }}
                >
                  {currency.symbol} {currency.label}
                </p>
              ))}
            </>
          );
        }}
      </Query>
    );

    return (
      <Query query={getQuery(1)}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <>
              <Dropdown
                text={this.props.category}
                style={{
                  textTransform: "capitalize",
                  fontWeight: 400,
                  fontSize: "32px",
                }}
                stateProp={this.state.dropdownActive}
                click={this.handleClick}
                query={categoriesQuery}
                category
              />
              {data.categories.map((category) => (
                <div
                  key={category.name}
                  style={{ padding: "20px 100px 20px 100px" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "33% 33% 33%",
                    }}
                  >
                    {category.products.map((product) => (
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
                          <h3 style={{ fontWeight: 400 }}>{product.name}</h3>
                          {product.prices.map((price) => (
                            <div key={price.amount}>
                              {this.props.label === price.currency.label ? (
                                <p style={{ fontWeight: 600 }}>
                                  <span>{this.props.symbol}</span>
                                  <span>{price.amount}</span>
                                </p>
                              ) : null}
                            </div>
                          ))}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  category: state.activeCategory.name,
});

const mapDispatchToProps = { setActiveCurrency, setActiveCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
