import { toast } from 'react-toastify';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import routePaths from '../router/paths';
import RecipeForm from '../components/recipe/RecipeForm';
import PageTitle from '../components/common/PageTitle';
import useRecipeByIdQuery from '../hooks/useRecipeById';

const updateRecipeMutation = gql`
  mutation updateRecipe($recipeId: ID!, $input: RecipeUpdateInput!) {
    updateRecipe(recipeId: $recipeId, input: $input) {
      _id
    }
  }
`;

export default function EditRecipe() {
  const { id: recipeId } = useParams();

  const history = useHistory();

  const { recipe, loading: isLoading, error } = useRecipeByIdQuery(recipeId);

  const [updateRecipe] = useMutation(updateRecipeMutation, {
    variables: {
      recipeId,
    },
    onError: (e) => {
      toast.error(e.message);
    },
    onCompleted: () => {
      toast.success('Recipe updated successfully! 🎉');
      history.push(generatePath(routePaths.recipeDetails, { id: recipeId }));
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
    <div className="mb-3">
      <PageTitle title="Edit recipe" />
      <RecipeForm
        initialValues={recipe}
        onSubmit={async (values) => {
          await updateRecipe({ variables: { input: values } });
        }}
        submitButtonTitle="Save"
      />
    </div>
  );
}
