import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";

class Cart extends React.Component {
  render() {
    return (
      <>
        <Query query={getQuery(1)}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <>
                <h3>
                  <strong>My Bag.</strong> {this.props.cart.length} items
                </h3>
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
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart,
});

export default connect(mapStateToProps)(Cart);
