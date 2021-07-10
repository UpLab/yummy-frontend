import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import AuthManager from '../services/AuthManager';
import APIService from '../services/APIService';

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'token',
  isTokenValidOrUndefined: () => {
    const hasToken = AuthManager.getAccessToken();
    const isExpired = AuthManager.isAccessTokenExpired();
    return !hasToken || !isExpired;
  },
  fetchAccessToken: async () => {
    await APIService.refreshToken();
    return { token: AuthManager.getAccessToken() };
  },
  handleFetch: () =>
    console.log('refreshed a token with apollo TokenRefreshLink'),
  handleResponse: () => (response) => {
    return response;
  },
  handleError: () => {
    AuthManager.logout();
  },
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = AuthManager.getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([tokenRefreshLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
