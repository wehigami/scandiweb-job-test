import { gql } from "@apollo/client";

const allQueries = [
  {
    name: "GET_CURRENCIES",
    query: gql`
      query getCurrencies {
        currencies {
          label
          symbol
        }
      }
    `,
  },
  {
    name: "GET_CATEGORIES",
    query: gql`
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
    `,
  },
];

export function getQuery(x) {
    return allQueries[x].query;
  }
  