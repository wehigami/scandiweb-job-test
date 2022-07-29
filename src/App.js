import React from "react";
import Layout from "./components/layout";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        brand
        attributes {
          name
          items {
            displayValue
          }
        }
        prices {
          currency {
            label
          }
          amount
        }
      }
    }
  }
`;
console.log(GET_CATEGORIES);

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout />
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <ul>
                {data.categories.map((category) => (
                  <li key={category.id}>
                    <h3>{category.name}</h3>
                    <ul>
                      {category.products.map((product) => (
                        <li key={product.id}>
                          <h4>{product.name}</h4>
                          {product.description}
                          <img src={product.gallery[0]} alt={product.name} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
