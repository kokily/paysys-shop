import { gql } from 'apollo-boost';

// Add Bill API
export const ADD_BILL = gql`
  mutation AddBill($title: String!, $hall: String!, $etc: String!) {
    AddBill(title: $title, hall: $hall, etc: $etc) {
      ok
      error
    }
  }
`;

// List Bills API
export const LIST_BILLS = gql`
  query ListBills($cursor: ID, $user_id: ID, $title: String, $hall: String) {
    ListBills(cursor: $cursor, user_id: $user_id, title: $title, hall: $hall) {
      ok
      error
      bills {
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

// Read Bill API
export const READ_BILL = gql`
  query ReadBill($id: ID!) {
    ReadBill(id: $id) {
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

// Remove Bill API
export const REMOVE_BILL = gql`
  mutation RemoveBill($id: ID!) {
    RemoveBill(id: $id) {
      ok
      error
    }
  }
`;

// Restore Bill API
export const RESTORE_BILL = gql`
  mutation RestoreBill($id: ID!) {
    RestoreBill(id: $id) {
      ok
      error
    }
  }
`;
