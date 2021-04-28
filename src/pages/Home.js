import { Row, Col } from 'react-bootstrap';
import RecipeListCard from '../components/recipe/RecipeListCard';
import { recipeListFactory } from '../__mocks__/recipe';

export default function Home() {
  const recipeList = recipeListFactory();

  return (
    <>
      <p>Recipe List</p>
      <Row>
        {recipeList.map((recipe) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4">
            <RecipeListCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </>
  );
}
