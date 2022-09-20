import React from "react";
import Product from "./product";
import style from "./productListingPage.module.scss";
import Layout from "../../components/layout";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { setProductHover } from "../../redux/productHoverSlice";
import { location } from "../../lib/utils";

let opacityDivStyle = {
  opacity: 0.5,
};

class Products extends React.Component {
  componentDidMount() {
    this.props.setProductHover([false, null]);
  }
  render() {
    return (
      <Layout>
        <div style={{ padding: "20px 100px 20px 100px" }}>
          <Query query={getQuery(2)} variables={{ title: location() }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <>
                  <div className={style.wrapper}>
                    <h2
                      className={style.categoryTitle}>
                      {data.category.name}
                    </h2>
                    <div
                      className={style.productWrapper}
                    >
                      {data.category.products.map((product) => (
                        <div
                          key={product.id}
                          style={
                            product.inStock ? null : opacityDivStyle
                          }
                          className={style.productHighlight}
                          onMouseEnter={() =>
                            //responsible for showing the add to cart button on hover
                            this.props.setProductHover([true, product.id])
                          }
                          onMouseLeave={() =>
                            this.props.setProductHover([false, null])
                          }
                        >
                          <Product
                            productId={product.id}
                            productImg={product.gallery[0]}
                            productName={product.name}
                            productPrices={product.prices}
                            productBrand={product.brand}
                            inStock={product.inStock}
                            productAttributes={product.attributes}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            }}
          </Query>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  hover: state.productHover.hover,
  productsId: state.productHover.productId,
  label: state.activeCurrency.label,
  currentLink: state.currentLink.currentLink,
});

const mapDispatchToProps = { setProductHover };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
