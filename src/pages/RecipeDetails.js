import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import RecipeListCard from '../components/recipe/RecipeListCard';
import useAPIQuery from '../hooks/useAPIQuery';
import APIService from '../services/APIService';

export default function RecipeDetails() {
  const params = useParams();

  const {
    data: recipe,
    isLoading,
    error,
  } = useAPIQuery({
    call: () => APIService.getRecipeById(params.id),
  });

  if (isLoading && !recipe) return <div>Loading...</div>;
  if (!recipe) {
    return <Alert variant="danger">Recipe not found</Alert>;
  }
  if (!recipe && error && !isLoading) {
    return <Alert variant="danger">{error}</Alert>;
  }
  return (
    <p>
      <h1>Recipe Details</h1>
      <RecipeListCard recipe={recipe} />
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </p>
  );
}
