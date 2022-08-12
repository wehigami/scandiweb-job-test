import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";

class Cart extends React.Component {
  render() {
    const uniqueItems = new Set(this.props.cart);
    return this.props.cartClick ? (
      <div
        style={{
          height: 680,
          width: 325,
          background: "#fff",
          position: "absolute",
          zIndex: "2",
          marginRight: 100,
          overflow: 'hidden'
        }}
      >
        <Query query={getQuery(1)}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <div style={{ margin: "40px 20px" }}>
                <p>
                  <strong>My Bag.</strong> {this.props.cart.length}{" "}
                  {this.props.cart.length === 1 ? "item" : "items"}
                </p>
                {data.categories.map((category) => 
                    category.products.map((product) =>
                        uniqueItems.has(product.id) ? (
                          <div
                          key={product.id}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(2, 1fr)",
                            }}
                          >
                            <div>test</div>

                            <div
                              style={{
                                width: 120,
                                height: 190,
                                backgroundImage: `url(${product.gallery[0]})`,
                                backgroundSize: "150%",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          </div>
                        ) : null
                    )
                )}
              </div>
            );
          }}
        </Query>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart,
  cartClick: state.cartClick.cartClicked,
});

export default connect(mapStateToProps)(Cart);
