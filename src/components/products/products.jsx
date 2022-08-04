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
    return (
      <Query query={getQuery(1)}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <>
              {data.categories.map((category) => (
                <div
                  key={category.name}
                  style={{ padding: "20px 100px 20px 100px" }}
                >
                  <Dropdown
                    text={category.name}
                    style={{
                      textTransform: "capitalize",
                      fontWeight: 400,
                      fontSize: "32px",
                    }}
                    stateProp={this.state.dropdownActive}
                    click={this.handleClick}
                  />
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
