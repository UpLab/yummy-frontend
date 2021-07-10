import { toast } from 'react-toastify';
import { generatePath, useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import routePaths from '../router/paths';
import RecipeForm from '../components/recipe/RecipeForm';
import PageTitle from '../components/common/PageTitle';
import { getFirstResult } from '../utils/graphql';

const createRecipeMutation = gql`
  mutation createRecipe($input: RecipeCreateInput!) {
    createRecipe(input: $input) {
      _id
    }
  }
`;
export default function NewRecipe() {
  const history = useHistory();
  const [addRecipe] = useMutation(createRecipeMutation, {
    onCompleted: (data) => {
      const recipe = getFirstResult(data);

      toast.success('Recipe created successfully! 🎉');
      history.push(generatePath(routePaths.recipeDetails, { id: recipe._id }));
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return (
    <div className="mb-3">
      <PageTitle title="Add new recipe" />
      <RecipeForm
        onSubmit={async (values) => {
          await addRecipe({ variables: { input: values } });
        }}
        submitButtonTitle="Create"
      />
    </div>
  );
}
