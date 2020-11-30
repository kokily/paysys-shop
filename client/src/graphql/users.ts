import { gql } from 'apollo-boost';

// List Users API
export const LIST_USERS = gql`
  query ListUsers($cursor: ID, $username: String) {
    ListUsers(cursor: $cursor, username: $username) {
      ok
      error
      users {
        id
        username
        admin
        token_version
        created_at
      }
    }
  }
`;

// Read User API
export const READ_USER = gql`
  query ReadUser($id: ID!) {
    ReadUser(id: $id) {
      ok
      error
      user {
        id
        username
        admin
        token_version
        created_at
      }
    }
  }
`;

// Remove User API
export const REMOVE_USER = gql`
  mutation RemoveUser($id: ID!) {
    RemoveUser(id: $id) {
      ok
      error
    }
  }
`;

// Set Admin User API
export const SET_ADMIN = gql`
  mutation SetAdmin($id: ID!) {
    SetAdmin(id: $id) {
      ok
      error
    }
  }
`;

// Set Employee User API
export const SET_EMPLOYEE = gql`
  mutation SetEmployee($id: ID!) {
    SetEmployee(id: $id) {
      ok
      error
    }
  }
`;

export const INIT_PASSWORD = gql`
  mutation InitPassword($id: ID!) {
    InitPassword(id: $id) {
      ok
      error
    }
  }
`;
