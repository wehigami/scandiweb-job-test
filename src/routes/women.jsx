import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { setActiveCurrency } from "../redux/currencySlice";

class Women extends React.Component {
  render() {
    return (
      <Layout navData={getQuery(0)}>
        <Query query={getQuery(1)}>
          {({loading, error, data}) => {
            if(loading) return <p>Loading...</p>;
            if(error) return <p>Error :(</p>
            return (
              <></>
            )
          }}
        </Query>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.activeCurrency.label,
  symbol: state.activeCurrency.symbol,
});

const mapDispatchToProps = { setActiveCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Women);


{/* <Query query={getQuery(1)}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <ul style={{listStyleType: 'none'}}>
                {data.categories.map((category) => (
                  <li key={category.name}>
                    <h3 style={{textTransform: 'uppercase', fontSize: '42px', fontWeight: 400}}>{category.name}</h3>
                    <ul>
                      {category.products.map((product) => (
                        <li key={product.id}>
                          <img src={product.gallery[0]} alt={product.name} />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: product.description,
                            }}
                          ></div>
                          {product.prices.map((price) => (
                            <p key={price.amount}>
                              {this.props.label === price.currency.label ? (
                                <>
                                  <span>{price.amount}</span>{" "}
                                  <span>{price.currency.label}</span>
                                </>
                              ) : null}
                            </p>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query> */}