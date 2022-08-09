import React from "react";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { setActiveCategoryName } from "../../redux/categorySlice";
import { setProductHover } from "../../redux/productHoverSlice";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/dropdown";
import Product from "./product";
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
      <Query query={getQuery(1)}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <>
              {data.categories.map((category) => (
                <p
                  key={category.name}
                  style={{
                    margin: 0,
                    padding: 0,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    textTransform: 'capitalize'
                  }}
                  onClick={() => {
                    this.props.setActiveCategoryName(category.name);
                    this.handleClick();
                  }}
                >
                  {category.name}
                </p>
              ))}
            </>
          );
        }}
      </Query>
    );

    return (
      <div style={{ padding: "20px 100px 20px 100px" }}>
        <Dropdown
          text={this.props.categoryName}
          style={{
            textTransform: "capitalize",
            fontWeight: 400,
            fontSize: "32px",
          }}
          query={categoriesQuery}
          category
        />
        <Query query={getQuery(1)}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <>
                {data.categories.map((category) =>
                  this.props.categoryName === category.name ? (
                    <div key={category.name}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "33% 33% 33%",
                        }}
                      >
                        {category.products.map((product) =>
                          product.inStock ? (
                            <Link
                              to={`products/${product.id}`}
                              style={{ color: "#1D1F22", display: "contents" }}
                            >
                              <Product
                                productId={product.id}
                                productImg={product.gallery[0]}
                                productName={product.name}
                                productPrices={product.prices}
                                highlightStyle={style.productHighlight}
                                
                              />
                            </Link>
                          ) : (
                            <Product
                              productId={product.id}
                              productImg={product.gallery[0]}
                              productName={product.name}
                              productPrices={product.prices}
                              notInStock
                            />
                          )
                        )}
                      </div>
                    </div>
                  ) : null
                )}
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
  categoryName: state.activeCategory.categoryName,
  hover: state.productHover.hover,
});

const mapDispatchToProps = { setActiveCategoryName, setProductHover };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
