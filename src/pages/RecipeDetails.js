import { generatePath, Link, useHistory, useParams } from 'react-router-dom';
import {
  Alert,
  Breadcrumb,
  ButtonGroup,
  Card,
  Col,
  Image,
  Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faPencilAlt,
  faTrash,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { useMutation, gql } from '@apollo/client';

import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Button from '../components/common/Button';
import routePaths from '../router/paths';
import PageTitle from '../components/common/PageTitle';
import useRecipeByIdQuery from '../hooks/useRecipeById';

const deleteRecipeMutation = gql`
  mutation deleteRecipe($recipeId: ID!) {
    deleteRecipe(recipeId: $recipeId)
  }
`;

export default function RecipeDetails() {
  const params = useParams();

  const {
    recipe,
    loading: isLoading,
    error,
  } = useRecipeByIdQuery(params.id, { fetchPolicy: 'cache-and-network' });

  const history = useHistory();

  const [deleteRecipe, { loading: isDeletingRecipe }] = useMutation(
    deleteRecipeMutation,
    {
      variables: { recipeId: params.id },
      onCompleted: () => {
        toast.success('Recipe deleted successfully');
        history.push(routePaths.myRecipes);
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  if (isLoading && !recipe) return <div>Loading...</div>;
  if (!recipe && error && !isLoading) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  if (!recipe) {
    return <Alert variant="danger">Recipe not found</Alert>;
  }

  return (
    <>
      <Breadcrumb className="mt-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: routePaths.myRecipes }}>
          My Recipes
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{recipe.name}</Breadcrumb.Item>
      </Breadcrumb>
      <PageTitle
        title={recipe.name}
        right={
          <ButtonGroup>
            <Button
              size="sm"
              variant="outline-primary"
              as={Link}
              to={generatePath(routePaths.editRecipe, { id: recipe._id })}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                const confirmed = confirm(
                  'Are you sure you want to delete this recipe?'
                );
                if (confirmed) {
                  deleteRecipe();
                }
              }}
              loading={isDeletingRecipe}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ButtonGroup>
        }
      />
      <div>
        <Row>
          <Col md={7}>
            <Image
              src={recipe.featuredImage}
              alt={recipe.name}
              rounded
              style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
            />
          </Col>
          <Col>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Info</Card.Title>
                <FontAwesomeIcon icon={faClock} /> {recipe.cookTimeMinutes} min
                <br />
                <FontAwesomeIcon icon={faUtensils} /> {recipe.servings}
                <br />
                {recipe.updatedAt ? (
                  <small className="text-muted float-right">
                    Last update:{' '}
                    {format(new Date(recipe.updatedAt), 'dd MMM yyyy')}
                  </small>
                ) : null}
              </Card.Body>
            </Card>
            {Array.isArray(recipe.ingredients) && recipe.ingredients.length ? (
              <Card>
                <Card.Body>
                  <Card.Title>Ingredients</Card.Title>
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
                      <li>
                        {ingredient.value} {ingredient.unit} –{' '}
                        {ingredient.title}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
        </Row>
        <div className="mt-3">
          <h2>Instructions</h2>
          <ol className="mt-3">
            {recipe.instructions.map((step, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>{step}</li>
            ))}
          </ol>
          {recipe.notes ? (
            <Alert variant="info">
              <b>Note: </b>
              {recipe.notes}
            </Alert>
          ) : null}
        </div>
      </div>
    </>
  );
}
