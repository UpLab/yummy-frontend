import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import MockDataService from '../services/MockDataService';
import RecipeListCard from '../components/recipe/RecipeListCard';

export default function RecipeDetails() {
  const params = useParams();

  const recipe = MockDataService.findRecipeById(params.id);
  if (!recipe) {
    return <Alert variant="danger">Recipe not found</Alert>;
  }
  return (
    <p>
      <h1>Recipe Details</h1>
      <RecipeListCard recipe={recipe} />
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </p>
  );
}
