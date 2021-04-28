import { Link, generatePath } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import paths from '../../router/paths';
import classNames from './RecipeListCard.module.scss';

export default function RecipeListCard({ recipe }) {
  return (
    <Link
      to={generatePath(paths.recipeDetails, { id: recipe._id })}
      className={classNames.cardLink}
    >
      <Card>
        <Card.Img
          variant="top"
          src={recipe.featuredImage}
          alt={`${recipe.name} image`}
        />
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text>
            {/* TODO: add some details here */}
            Some quick example text to build on the card title and make up the
            bulk of the content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
