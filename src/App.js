import React from "react";
import Layout from "./components/layout";
import { Query } from "@apollo/client/react/components";
import { getQuery } from './lib/queries';

//get all the required data from the endpoint using graphql
class App extends React.Component {
  render() {
    return (
      <Layout navData={getQuery(0)}>
        <Query query={getQuery(1)}>
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
                          <img src={product.gallery[0]} alt={product.name} />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: product.description,
                            }}
                          ></div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default App;
