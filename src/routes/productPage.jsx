import React from "react";
import Layout from "../components/layout";
import { getQuery } from "../lib/queries";
import { Query } from "@apollo/client/react/components";
import { location } from "../lib/location";

class ProductPage extends React.Component {
  render() {
    return (
      <Layout>
        <Query query={getQuery(1)}>
          {({ loading, error, data }) => {
            if(loading) return <p>loading...</p>
            if(error) return <p>error :(</p>
            return(
              <>
                {data.categories[0].products.map((product) => (
                  location() === product.id ? (
                    <div key={product.id} style={{display: 'grid', gridTemplateColumns: '0.1fr 0.5fr 0.4fr', margin: '100px', height: '100px'}}>
                      <div style={{height: '80%'}}>
                        {product.gallery.map((item) => (
                          <div style={{backgroundImage: `url(${item})`, height: '100px', width: '100px', backgroundSize: "cover", }} key={item} />
                        ))}
                      </div>
                      <div style={{backgroundImage: `url(${product.gallery[0]})`, backgroundSize: "cover",}}>test</div>
                      <div>test</div>
                    </div>
                  ) : null
                ))}
              </>
            )
          }}
        </Query>
      </Layout>
    );
  }
}

export default ProductPage;
