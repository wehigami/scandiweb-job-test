import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";

class Cart extends React.Component {
  render() {
    return (
      <div style={{height: 680, width: 325, background: 'red', position: 'absolute', zIndex: '2', marginRight: 32}}>
        <Query query={getQuery(1)}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <div>
                <p>
                  <strong>My Bag.</strong> {this.props.cart.length} {this.props.cart.length === 1 ? "item" : "items"}
                </p>
                {data.categories.map((category) => (
                  <div key={category.name}>
                    {category.products.map((product) =>
                      this.props.cart.map((item) =>
                        product.id === item ? (
                          <div>
                            <div>test</div>
                            <div>tester</div>
                          </div>
                        ) : null
                      )
                    )}
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart,
});

export default connect(mapStateToProps)(Cart);
