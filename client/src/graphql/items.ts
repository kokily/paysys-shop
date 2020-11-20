import { gql } from 'apollo-boost';

// Add Item API
export const ADD_ITEM = gql`
  mutation AddItem(
    $name: String!
    $divide: String!
    $native: String!
    $unit: String!
    $price: Int!
  ) {
    AddItem(name: $name, divide: $divide, native: $native, unit: $unit, price: $price) {
      ok
      error
    }
  }
`;

// List Items API
export const LIST_ITEMS = gql`
  query ListItems($cursor: ID, $name: String, $divide: String, $native: String) {
    ListItems(cursor: $cursor, name: $name, divide: $divide, native: $native) {
      ok
      error
      items {
        id
        num
        name
        divide
        native
        unit
        price
        created_at
        updated_at
      }
    }
  }
`;

// Read Item API
export const READ_ITEM = gql`
  query ReadItem($id: ID!) {
    ReadItem(id: $id) {
      ok
      error
      item {
        id
        num
        name
        divide
        native
        unit
        price
        created_at
        updated_at
      }
    }
  }
`;

// Remove Item API
export const REMOVE_ITEM = gql`
  mutation RemoveItem($id: ID!) {
    RemoveItem(id: $id) {
      ok
      error
    }
  }
`;

// Update Item API
export const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $id: ID!
    $name: String
    $divide: String
    $native: String
    $unit: String
    $price: String
  ) {
    UpdateItem(id: $id, name: $name, divide: $divide, native: $native, unit: $unit, price: $price) {
      ok
      error
      item {
        id
        num
        name
        divide
        native
        unit
        price
        created_at
        updated_at
      }
    }
  }
`;
