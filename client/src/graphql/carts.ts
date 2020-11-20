import { gql } from 'apollo-boost';

// Add Cart API
export const ADD_CART = gql`
  mutation AddCart($item_id: ID!, $count: Int!, $price: Int!) {
    AddCart(item_id: $item_id, count: $count, price: $price) {
      ok
      error
      cart {
        id
        user_id
        bill_id
        completed
        deleted
        items {
          id
          name
          divide
          native
          unit
          price
          count
          amount
        }
      }
    }
  }
`;

// Remove Cart API
export const REMOVE_CART = gql`
  mutation RemoveCart {
    RemoveCart {
      ok
      error
    }
  }
`;

// Remove One API
export const REMOVE_ONE = gql`
  mutation RemoveOne($item_id: ID!) {
    RemoveOne(item_id: $item_id) {
      ok
      error
    }
  }
`;

// View Cart API
export const VIEW_CART = gql`
  query ViewCart {
    ViewCart {
      ok
      error
      cart {
        id
        user_id
        bill_id
        completed
        deleted
        items {
          id
          name
          divide
          native
          unit
          price
          count
          amount
        }
      }
    }
  }
`;
