/* eslint-disable no-nested-ternary */
import React from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import RecipeListGrid from '../components/recipe/RecipeListGrid';
import MockDataService from '../services/MockDataService';
import useAPIQuery from '../hooks/useAPIQuery';
import useAPIMethod from '../hooks/useAPIMethod';

export default function Home() {
  const {
    data: recipeList,
    isLoading,
    error,
    refetch: refetchRecipes,
  } = useAPIQuery({
    url: '/api/recipes',
  });

  const [addRecipe, isAddingRecipe] = useAPIMethod({
    debugWaitMS: 1000,
    url: '/api/recipes/create',
    onComplete: refetchRecipes,
    onError: (msg) => {
      toast.error(msg);
    },
  });

  const [resetRecipes, isResettingRecipes] = useAPIMethod({
    debugWaitMS: 500,
    url: '/api/recipes/reset',
    onComplete: refetchRecipes,
    onError: (msg) => {
      toast.error(msg);
    },
  });

  return (
    <>
      <h1>Recipe List</h1>
      {isLoading && !recipeList?.length ? (
        <div>Loading...</div>
      ) : (
        <>
          <Button
            onClick={() => addRecipe(MockDataService.generateRecipe())}
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
            onClick={() => resetRecipes()}
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
          {Array.isArray(recipeList) ? (
            <>
              {recipeList.length ? (
                <RecipeListGrid recipeList={recipeList} />
              ) : (
                <div>
                  No recipes in your list. Please click on "Add recipe" button
                </div>
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
}
