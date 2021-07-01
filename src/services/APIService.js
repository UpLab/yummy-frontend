// post '/api/auth/register'
// post '/api/auth/token'
// post '/api/auth/logout'

import axios from 'axios';
import AuthManager from './AuthManager';

const errors = {
  TOKEN_EXPIRED: 'Your session expired. Please login again',
};

class APIService {
  #injectResponseMessageToError = (error) => {
    const message = error.response?.data?.error;
    // eslint-disable-next-line no-param-reassign
    if (message) error.message = message;
  };

  #fetch = async (params) => {
    const { url, method, data, _retry = false } = params;

    console.log('Checking token expiration');
    if (AuthManager.isAccessTokenExpired()) {
      console.log('Token is expired');
      await this.#tryRefreshingTokenOrLogoutAndThrow();
    }
    try {
      console.log('Fetching the API...', url);
      const result = await axios(url, {
        method,
        headers: {
          Authorization: AuthManager.getAccessToken(),
        },
        data,
      });
      console.log('Fetch succeeded', url);
      return result.data;
    } catch (error) {
      if (error.response.status === 401) {
        console.log('Received Unauthorized error from server');
        if (_retry) {
          console.log('The request has already been retried, so we logout');
          this.logout();
          throw new Error(errors.TOKEN_EXPIRED);
        } else {
          console.log('Trying to refresh the access token');
          await this.#tryRefreshingTokenOrLogoutAndThrow();
          console.log('Retrying original request with new access token', url);
          const retryData = await this.#fetch({ ...params, _retry: true });
          console.log('Retry succeeded!', url);
          return retryData;
        }
      } else {
        throw error;
      }
    }
  };

  #tryRefreshingTokenOrLogoutAndThrow = async () => {
    try {
      console.log('Refreshing token');
      await this.#refreshToken();
      console.log('Token successfully refreshed');
    } catch (error) {
      console.log('Error refreshing token', error);
      console.log('Logging out user.');
      // error refreshing token
      this.logout();
      throw new Error(errors.TOKEN_EXPIRED);
    }
  };

  #refreshToken = async () => {
    const refreshToken = AuthManager.getRefreshToken();
    const {
      data: { accessToken },
    } = await axios({
      url: '/api/auth/token',
      method: 'post',
      data: { token: refreshToken },
    });
    console.log('received new access token', accessToken);
    AuthManager.setAccessToken(accessToken);
  };

  logout = async () => {
    // AuthManager.logout();
    const refreshToken = AuthManager.getRefreshToken();
    if (refreshToken) {
      return axios({
        url: '/api/auth/logout',
        method: 'post',
        data: { token: refreshToken },
      });
    }
    return null;
  };

  login = async ({ email, password }) => {
    try {
      const data = await this.#fetch({
        url: '/api/auth/login',
        method: 'post',
        data: { email, password },
      });
      const { accessToken, refreshToken } = data;
      // AuthManager.login({ accessToken, refreshToken });
      AuthManager.login({ accessToken, refreshToken });
    } catch (error) {
      this.#injectResponseMessageToError(error);
      throw error;
    }
  };

  createAccount = async ({ email, password }) => {
    try {
      await this.#fetch({
        url: '/api/auth/register',
        method: 'post',
        data: { email, password },
      });
      await this.login({ email, password });
    } catch (error) {
      this.#injectResponseMessageToError(error);
      throw error;
    }
  };

  getRecipeList = async () => {
    return this.#fetch({ url: '/api/recipes', method: 'get' });
  };

  getRecipeById = async (id) => {
    return this.#fetch({ url: `/api/recipes/${id}`, method: 'get' });
  };

  addRecipe = async (data) => {
    return this.#fetch({ url: '/api/recipes/create', method: 'post', data });
  };

  resetRecipes = async () => {
    return this.#fetch({ url: '/api/recipes/reset', method: 'post' });
  };
}

export default new APIService();
