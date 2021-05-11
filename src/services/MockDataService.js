import { recipeListFactory, recipeFactory } from '../__mocks__/recipe';

class MockDataService {
  constructor() {
    this.recipeList = recipeListFactory();
  }

  generateRecipe() {
    return recipeFactory();
  }

  getRecipes() {
    return this.recipeList;
  }

  findRecipeById(_id) {
    return this.recipeList.find((recipe) => recipe._id === _id);
  }
}

export default new MockDataService();
