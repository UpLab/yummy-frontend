/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import RecipeListGrid from '../components/recipe/RecipeListGrid';
import MockDataService from '../services/MockDataService';

const wait = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const noop = () => {};

const useAPIMethod = ({
  url,
  method = 'post',
  onComplete = noop,
  onError = noop,
  debugWaitMS,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const call = useCallback(
    async (data) => {
      setIsLoading(true);
      if (debugWaitMS) await wait(debugWaitMS);
      try {
        const result = await axios({
          method,
          url,
          data,
        });
        await onComplete(result.data);
      } catch (e) {
        const msg = e.message;
        onError(msg, e);
      } finally {
        setIsLoading(false);
      }
    },
    [debugWaitMS, method, onComplete, onError, url]
  );

  return [call, isLoading];
};

const useAPIQuery = ({ url, debugWaitMS }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const [fetch, isLoading] = useAPIMethod({
    method: 'get',
    url,
    onComplete: setData,
    onError: setError,
    debugWaitMS,
  });

  useEffect(() => {
    console.log('Calling method');
    fetch();
  }, [fetch]);

  return { data, isLoading, refetch: fetch, error };
};

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
