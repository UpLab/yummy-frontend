// post '/api/auth/register'
// post '/api/auth/token'
// post '/api/auth/logout'

import axios from 'axios';
import AuthManager from './AuthManager';

class APIService {
  #fetch = async ({ url, method, data }) => {
    const result = await axios(url, {
      method,
      headers: {
        Authorization: AuthManager.getAccessToken(),
      },
      data,
    });
    return result.data;
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
      AuthManager.login(accessToken);
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
