/* eslint-disable no-nested-ternary */
import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import routePaths from '../router/paths';
import RecipeListGrid from '../components/recipe/RecipeListGrid';
import PageTitle from '../components/common/PageTitle';
import { getFirstResult } from '../utils/graphql';

const userRecipesQuery = gql`
  query userRecipes {
    userRecipes {
      _id
      name
      featuredImage
    }
  }
`;

function useUserRecipes() {
  const { loading, error, data, ...rest } = useQuery(userRecipesQuery, {
    fetchPolicy: 'cache-and-network',
  });

  return [getFirstResult(data) || [], { loading, error, ...rest }];
}

export default function Home() {
  const [recipeList, { loading: isLoading, error }] = useUserRecipes();
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
          {error ? <Alert variant="danger">{error.message}</Alert> : null}
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
