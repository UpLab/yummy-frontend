import { Row, Col } from 'react-bootstrap';
import RecipeListCard from '../components/recipe/RecipeListCard';
import MockDataService from '../services/MockDataService';

export default function Home() {
  const recipeList = MockDataService.getRecipes();

  return (
    <>
      <h1>Recipe List</h1>
      <Row>
        {recipeList.map((recipe) => (
          <Col key={recipe._id} lg="3" md="4" sm="6" xs="6" className="mb-4">
            <RecipeListCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </>
  );
}
