import { gql } from 'apollo-boost';

// Add Reserve API
export const ADD_RESERVE = gql`
  mutation AddReserve($bill_id: ID!, $reserve: Int!) {
    AddReserve(bill_id: $bill_id, reserve: $reserve) {
      ok
      error
      bill {
        id
        title
        hall
        etc
        total_amount
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
        reserve
        username
        user_id
        cart_id
        created_at
      }
    }
  }
`;

// Remove Reserve API
export const REMOVE_RESERVE = gql`
  mutation RemoveReserve($id: ID!) {
    RemoveReserve(id: $id) {
      ok
      error
      bill {
        id
        title
        hall
        etc
        total_amount
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
        reserve
        username
        user_id
        cart_id
        created_at
      }
    }
  }
`;
