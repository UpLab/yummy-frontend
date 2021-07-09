/* eslint-disable no-nested-ternary */
import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routePaths from '../router/paths';
import RecipeListGrid from '../components/recipe/RecipeListGrid';
import useAPIQuery from '../hooks/useAPIQuery';
import APIService from '../services/APIService';
import PageTitle from '../components/common/PageTitle';

export default function Home() {
  const {
    data: recipeList,
    isLoading,
    error,
  } = useAPIQuery({
    call: APIService.getRecipeList,
  });

  return (
    <>
      <PageTitle
        title="Recipes"
        right={
          <Link to={routePaths.newRecipe}>
            <Button>+ New recipe</Button>
          </Link>
        }
      />
      {isLoading && !recipeList?.length ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? <Alert variant="danger">{error}</Alert> : null}
          {Array.isArray(recipeList) ? (
            <>
              {recipeList.length ? (
                <RecipeListGrid recipeList={recipeList} />
              ) : (
                <Alert variant="info" className="mt-3">
                  No recipes in your list. Please click{' '}
                  <Link to={routePaths.newRecipe}>here</Link> to create new
                  recipe
                </Alert>
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
}
