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
