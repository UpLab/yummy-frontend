// post '/api/auth/register'
// post '/api/auth/token'
// post '/api/auth/logout'

import axios from 'axios';
import AuthManager from './AuthManager';

class APIService {
  #fetch = async (params) => {
    const { url, method, data, _retry = false } = params;
    if (AuthManager.isAccessTokenExpired()) {
      try {
        await this.#refreshToken();
        console.log('token successfully refreshed');
      } catch {
        // error refreshing token
        this.logout();
        throw new Error('Your session expired. Please login again (3)');
      }
    }
    try {
      const result = await axios(url, {
        method,
        headers: {
          Authorization: AuthManager.getAccessToken(),
        },
        data,
      });
      return result.data;
    } catch (error) {
      if (error.response.status === 401) {
        if (_retry) {
          this.logout();
          throw new Error('Your session expired. Please login again (1)');
        } else {
          console.log('refresh token');
          try {
            await this.#refreshToken();
            console.log('token successfully refreshed');
          } catch {
            // error refreshing token
            this.logout();
            throw new Error('Your session expired. Please login again (2)');
          }

          const retryData = await this.#fetch({ ...params, _retry: true });
          return retryData;
        }
      } else {
        throw error;
      }
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
      _retry: true,
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
      // TODO: show human-readable error
      console.log('Request error', error);
      throw error;
    }
  };

  getRecipeList = async () => {
    return this.#fetch({ url: '/api/recipes', method: 'get' });
  };

  addRecipe = async (data) => {
    return this.#fetch({ url: '/api/recipes/create', method: 'post', data });
  };

  resetRecipes = async () => {
    return this.#fetch({ url: '/api/recipes/reset', method: 'post' });
  };
}

export default new APIService();
