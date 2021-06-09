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

const useAPIMethod = ({ url, onComplete = noop, debugWaitMS }) => {
  const [isLoading, setIsLoading] = useState(false);
  const method = async (data) => {
    setIsLoading(true);
    if (debugWaitMS) await wait(debugWaitMS);
    try {
      const result = await axios({
        method: 'post',
        url,
        data,
      });
      await onComplete(result);
    } catch (e) {
      const msg = e.message;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return [method, isLoading];
};

const useAPIQuery = ({ url, onComplete = noop, debugWaitMS }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const method = useCallback(async () => {
    setIsLoading(true);
    if (debugWaitMS) await wait(debugWaitMS);
    try {
      const result = await axios({
        method: 'get',
        url,
      });
      setData(result.data);
      await onComplete(result.data);
    } catch (e) {
      const msg = e.message;
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [debugWaitMS, onComplete, url]);

  useEffect(() => {
    console.log('Calling method');
    method();
  }, [method]);

  return { data, isLoading, refetch: method, error };
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
  });

  const [resetRecipes, isResettingRecipes] = useAPIMethod({
    debugWaitMS: 500,
    url: '/api/recipes/reset',
    onComplete: refetchRecipes,
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
