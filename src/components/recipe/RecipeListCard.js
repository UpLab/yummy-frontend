import { Card } from 'react-bootstrap';

export default function RecipeListCard({ recipe }) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={recipe.featuredImage}
        alt={`${recipe.name} image`}
      />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
