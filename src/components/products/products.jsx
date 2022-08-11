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
import CartAdd from "./cartadd";

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
                    textTransform: "capitalize",
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

    const mainDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      background: "#fff",
      height: "500px",
      margin: 40,
      padding: 15,
      zIndex: 1,
    };
    let opacityDivStyle = {
      ...mainDivStyle,
      opacity: 0.5,
    }

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
                          gridTemplateColumns: "repeat(3, 1fr)",
                        }}
                      >
                        {category.products.map((product) =>
                          product.inStock ? (
                            <div
                              key={product.id}
                              style={mainDivStyle}
                              className={style.productHighlight}
                              onMouseEnter={() =>
                                this.props.setProductHover([true, product.id])
                              }
                              onMouseLeave={() =>
                                this.props.setProductHover([false, null])
                              }
                            >
                              {this.props.hover &&
                              this.props.productsId === product.id ? (
                                <div className="cart" style={{ margin: '370px 0 0 390px', position: 'absolute'}}>
                                  <CartAdd productId={product.id}/>
                                </div>
                              ) : null}
                              <Link
                                to={`products/${product.id}`}
                                style={{
                                  color: "#1D1F22",
                                  display: "contents",
                                }}
                                key={product.id}
                              >
                                <Product
                                  productId={product.id}
                                  productImg={product.gallery[0]}
                                  productName={product.name}
                                  productPrices={product.prices}
                                  highlightStyle={style.productHighlight}
                                />
                              </Link>
                            </div>
                          ) : (
                            <div key={product.id} style={opacityDivStyle}>
                              <Product
                                productId={product.id}
                                productImg={product.gallery[0]}
                                productName={product.name}
                                productPrices={product.prices}
                                notInStock
                              />
                            </div>
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
  categoryName: state.activeCategory.categoryName,
  hover: state.productHover.hover,
  productsId: state.productHover.productId,
});

const mapDispatchToProps = { setActiveCategoryName, setProductHover };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
