import { gql } from 'apollo-boost';

// Login User API
export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    LoginUser(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

// Register User API
export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    RegisterUser(username: $username, password: $password) {
      ok
      error
    }
  }
`;

// Logout User API
export const LOGOUT_USER = gql`
  mutation LogoutUser {
    LogoutUser {
      ok
      error
    }
  }
`;

// Check Me API
export const CHECK_ME = gql`
  query CheckMe {
    CheckMe {
      ok
      error
      user {
        id
        username
        admin
      }
    }
  }
`;
