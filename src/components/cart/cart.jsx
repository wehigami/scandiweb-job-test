import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../../lib/queries";
import { Query } from "@apollo/client/react/components";

class Cart extends React.Component {
  render() {
    const uniqueItems = new Set(this.props.cart);

    const btnStyle = {
      alignSelf: "end",
      height: 40,
    };

    return this.props.cartClick ? (
      <div
        style={{
          height: 650,
          width: 300,
          background: "#fff",
          position: "absolute",
          zIndex: "2",
          marginRight: 100,
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: "0.1fr 1.5fr 0.4fr",
          padding: 15,
        }}
      >
        <p>
          <strong>My Bag.</strong> {this.props.cart.length}{" "}
          {this.props.cart.length === 1 ? "item" : "items"}
        </p>
        <Query query={getQuery(1)}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <div
                style={{
                  height: "100%",
                  overflow: "hidden",

                }}
              >
                {data.categories.map((category) =>
                  category.products.map((product) =>
                    uniqueItems.has(product.id)
                      ? (console.log(uniqueItems.size),
                        (
                          <div
                            key={product.id}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(2, 1fr)",
                              columnGap: "10px",
                              background: "red",
                              margin: '20px 0 0 0',
                              padding: '10px',
                              height: 190,
                            }}
                          >
                            <div>{product.name}</div>

                            <div
                              style={{
                                backgroundImage: `url(${product.gallery[0]})`,
                                backgroundSize: "150%",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          </div>
                        ))
                      : null
                  )
                )}
              </div>
            );
          }}
        </Query>
        <div
          style={{
            display: "grid",
            gridTemplate: "repeat(2, 1fr) / repeat(2, 1fr)",
            columnGap: 20,
            gridTemplateAreas: "'a b' 'c d'",
            margin: "30px 0",
            background: 'blue'
          }}
        >
          <p style={{ gridArea: "a" }}>Total</p>
          <p style={{ gridArea: "b", justifySelf: "end" }}>200$</p>
          <button style={{ ...btnStyle, gridArea: "c" }}>view bag</button>
          <button style={{ ...btnStyle, gridArea: "d" }}>check out</button>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  cart: state.addToCart,
  cartClick: state.cartClick.cartClicked,
});

export default connect(mapStateToProps)(Cart);
