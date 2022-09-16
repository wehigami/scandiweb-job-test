import { gql } from "@apollo/client";

let GET_CURRENCIES = gql`
query getCurrencies {
  currencies {
    label
    symbol
  }
}
`;

let GET_CATEGORIES = gql`
query getCategories {
  categories {
    name
  }
}
`;

let GET_CATEGORY = gql`
  query getCategory($title: String!) {
    category(input: { title: $title }) {
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
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
          }
          amount
        }
        brand
      }
    }
  }
`;

let allQueries = [GET_CURRENCIES, GET_CATEGORIES, GET_CATEGORY];

export function getQuery(x) {
  return allQueries[x];
}

export function getQueryx(queryName) {
  return queryName;
}
