/* eslint-disable no-nested-ternary */
import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import routePaths from '../router/paths';
import RecipeListGrid from '../components/recipe/RecipeListGrid';
import useAPIQuery from '../hooks/useAPIQuery';
import useAPIMethod from '../hooks/useAPIMethod';
import APIService from '../services/APIService';

export default function Home() {
  const {
    data: recipeList,
    isLoading,
    error,
    refetch: refetchRecipes,
  } = useAPIQuery({
    call: APIService.getRecipeList,
  });

  // const [addRecipe, isAddingRecipe] = useAPIMethod({
  //   debugWaitMS: 1000,
  //   call: APIService.addRecipe,
  //   onComplete: refetchRecipes,
  //   onError: (msg) => {
  //     toast.error(msg);
  //   },
  // });

  const [resetRecipes, isResettingRecipes] = useAPIMethod({
    debugWaitMS: 500,
    call: APIService.resetRecipes,
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
          <Link to={routePaths.newRecipe}>
            <Button>+ New recipe</Button>
          </Link>
          <Button onClick={() => resetRecipes()} loading={isResettingRecipes}>
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
