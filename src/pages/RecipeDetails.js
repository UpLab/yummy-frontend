import { generatePath, Link, useHistory, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import routePaths from '../router/paths';
import RecipeListCard from '../components/recipe/RecipeListCard';
import useAPIQuery from '../hooks/useAPIQuery';
import APIService from '../services/APIService';
import useAPIMethod from '../hooks/useAPIMethod';

export default function RecipeDetails() {
  const params = useParams();

  const {
    data: recipe,
    isLoading,
    error,
  } = useAPIQuery({
    call: () => APIService.getRecipeById(params.id),
  });

  const history = useHistory();

  const [deleteRecipe, isDeletingRecipe] = useAPIMethod({
    debugWaitMS: 1000,
    call: APIService.deleteRecipeById,
    onError: toast.error,
    onComplete: () => {
      toast.success('Recipe deleted successfully');
      history.push(routePaths.myRecipes);
    },
  });

  if (isLoading && !recipe) return <div>Loading...</div>;
  if (!recipe && error && !isLoading) {
    return <Alert variant="danger">{error}</Alert>;
  }
  if (!recipe) {
    return <Alert variant="danger">Recipe not found</Alert>;
  }
  return (
    <p>
      <h1>
        {recipe.name}{' '}
        <Link to={generatePath(routePaths.editRecipe, { id: recipe._id })}>
          <Button size="sm" variant="outline-primary">
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            const confirmed = confirm(
              'Are you sure you want to delete this recipe?'
            );
            if (confirmed) {
              deleteRecipe(recipe._id);
            }
          }}
          loading={isDeletingRecipe}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </h1>

      <RecipeListCard recipe={recipe} />
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </p>
  );
}
