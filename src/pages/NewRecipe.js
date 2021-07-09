import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import APIService from '../services/APIService';
import useAPIMethod from '../hooks/useAPIMethod';
import routePaths from '../router/paths';
import RecipeForm from '../components/recipe/RecipeForm';
import PageTitle from '../components/common/PageTitle';

export default function NewRecipe() {
  const [addRecipe] = useAPIMethod({
    debugWaitMS: 1000,
    call: APIService.addRecipe,
    onError: toast.error,
  });
  const history = useHistory();
  return (
    <div className="mb-3">
      <PageTitle title="Add new recipe" />
      <RecipeForm
        onSubmit={async (values) => {
          await addRecipe(values);
          toast.success('Recipe created successfully! 🎉');
          history.push(routePaths.home);
        }}
        submitButtonTitle="Create"
      />
    </div>
  );
}
