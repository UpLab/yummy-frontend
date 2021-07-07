import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import APIService from '../services/APIService';
import useAPIMethod from '../hooks/useAPIMethod';
import routePaths from '../router/paths';
import RecipeForm from '../components/recipe/RecipeForm';
import useAPIQuery from '../hooks/useAPIQuery';

/*
  Front-end:
  - add updateRecipe method to APIService - DONE
  - add EditRecipe page to the router - DONE
  - get id from router params - DONE
  - add edit recipe button to the recipe page - DONE
  - fetch recipe data for the form initial values - DONE

  Back-end:
  - add POST method for updating recipe by id
  - add validation
  - add authorization
*/

export default function EditRecipe() {
  const { id: recipeId } = useParams();

  const history = useHistory();

  const [updateRecipe] = useAPIMethod({
    debugWaitMS: 1000,
    call: APIService.updateRecipe,
    onError: toast.error,
    onComplete: () => {
      toast.success('Recipe updated successfully! 🎉');
      history.push(routePaths.home);
    },
  });
  const {
    data: recipe,
    isLoading,
    error,
  } = useAPIQuery({
    call: () => APIService.getRecipeById(recipeId),
  });

  if (isLoading && !recipe) return <div>Loading...</div>;
  if (!recipe && error && !isLoading) {
    return <Alert variant="danger">{error}</Alert>;
  }
  if (!recipe) {
    return <Alert variant="danger">Recipe not found</Alert>;
  }

  return (
    <div className="mb-3">
      <h1>Edit recipe</h1>
      <RecipeForm
        initialValues={recipe}
        onSubmit={async (values) => {
          await updateRecipe(recipeId, values);
        }}
        submitButtonTitle="Save"
      />
    </div>
  );
}
