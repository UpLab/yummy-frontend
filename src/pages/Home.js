/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import RecipeListGrid from '../components/recipe/RecipeListGrid';
import MockDataService from '../services/MockDataService';

const wait = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecipes = () => {
    setIsLoading(true);
    return axios('/api/recipes')
      .then((response) => {
        setIsLoading(false);
        setRecipeList(response.data);
      })
      .catch((e) => {
        const msg = e.message;
        setIsLoading(false);
        setError(msg);
      });
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const addRecipe = async () => {
    setIsAddingRecipe(true);
    await wait(1000);
    const recipe = MockDataService.generateRecipe();
    try {
      const result = await axios({
        method: 'post',
        url: '/api/recipes/create',
        data: recipe,
      });
      console.log('Result: ', result);
      await fetchRecipes();
    } catch (e) {
      const msg = e.message;
      toast.error(msg);
    } finally {
      setIsAddingRecipe(false);
    }
  };

  const [isResettingRecipes, setIsResettingRecipes] = useState(false);
  const resetRecipes = async () => {
    setIsResettingRecipes(true);
    try {
      await axios({
        method: 'post',
        url: '/api/recipes/reset',
      });
      fetchRecipes();
    } catch (e) {
      const msg = e.message;
      toast.error(msg);
    } finally {
      setIsResettingRecipes(false);
    }
  };

  return (
    <>
      <h1>Recipe List</h1>
      {isLoading && !recipeList.length ? (
        <div>Loading...</div>
      ) : (
        <>
          <Button
            onClick={addRecipe}
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
            onClick={resetRecipes}
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
