/* eslint-disable no-nested-ternary */
import React from 'react';
import axios from 'axios';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import RecipeListGrid from '../components/recipe/RecipeListGrid';
import MockDataService from '../services/MockDataService';

const wait = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      recipeList: [],
      isAddingRecipe: false,
    };
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = () => {
    this.setState({ isLoading: true });
    return axios('/api/recipes')
      .then((response) => {
        this.setState({ recipeList: response.data, isLoading: false });
      })
      .catch((error) => {
        const msg = error.message;
        this.setState({ error: msg, isLoading: false });
      });
  };

  addRecipe = async () => {
    this.setState({ isAddingRecipe: true });
    await wait(1000);
    const recipe = MockDataService.generateRecipe();
    try {
      const result = await axios({
        method: 'post',
        url: '/api/recipes/create',
        data: recipe,
      });
      console.log('Result: ', result);
      await this.fetchRecipes();
    } catch (error) {
      const msg = error.message;
      toast.error(msg);
    } finally {
      this.setState({ isAddingRecipe: false });
    }
  };

  // addTwo = () => {
  //   console.log('adding recipe 1');
  //   this.addRecipe().then(() => {
  //     console.log('adding recipe 2');
  //     this.addRecipe();
  //   });
  // }

  resetRecipes = async () => {
    this.setState({ isResettingRecipes: true });
    try {
      await axios({
        method: 'post',
        url: '/api/recipes/reset',
      });
      await this.fetchRecipes();
    } catch (error) {
      const msg = error.message;
      toast.error(msg);
    } finally {
      this.setState({ isResettingRecipes: false });
    }
  };

  render() {
    const {
      recipeList,
      isLoading,
      error,
      isAddingRecipe,
      isResettingRecipes,
    } = this.state;

    return (
      <>
        <h1>Recipe List</h1>
        {isLoading && !recipeList.length ? (
          <div>Loading...</div>
        ) : (
          <>
            <Button
              onClick={this.addRecipe}
              disabled={isAddingRecipe || isResettingRecipes}
            >
              {isAddingRecipe ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}{' '}
              Add recipe
            </Button>
            <Button
              onClick={this.resetRecipes}
              disabled={isResettingRecipes || isAddingRecipe}
            >
              {isResettingRecipes ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}{' '}
              Reset
            </Button>

            {error ? <Alert variant="danger">{error}</Alert> : null}

            {recipeList.length ? (
              <RecipeListGrid recipeList={recipeList} />
            ) : (
              <div>
                No recipes in your list. Please click on "Add recipe" button
              </div>
            )}
          </>
        )}
      </>
    );
  }
}
