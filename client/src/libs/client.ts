import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable, Operation, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookies';
import { ENV, dev_server, prod_server } from './constants';
import { getAccessToken, setAccessToken } from './accessToken';

const getToken = () => {
  const token = cookie.load('paysys_token');

  if (token) {
    console.log(token);
    return token;
  } else {
    return '';
  }
};

const cache = new InMemoryCache();

const requestLink = new ApolloLink(
  (operation: Operation, forward: any) =>
    new Observable((observer) => {
      let handle: any;

      Promise.resolve(operation)
        .then((operation) => {
          const access_token = getAccessToken();

          if (access_token) {
            operation.setContext({
              headers: {
                paysys_auth: `bearer ${access_token}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const httpLink = new HttpLink({
  uri: ENV.NODE_ENV === 'production' ? `${prod_server}/graphql` : `${dev_server}/graphql`,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors);
  console.log(networkError);
});

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'access_token',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp }: any = jwtDecode(token);

      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(
      ENV.NODE_ENV === 'production'
        ? `${prod_server}/refresh_token`
        : `${dev_server}/refresh_token`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );
  },
  handleFetch: (access_token) => {
    setAccessToken(access_token);
  },
  handleError: (err) => {
    console.warn('Refresh Token is invalid, Plz Re Login');
    console.log(err);
  },
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, refreshLink as any, requestLink, httpLink]),
});

export default client;
