import { useQuery, gql } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const recipeQuery = gql`
  query recipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      name
      featuredImage
      cookTimeMinutes
      servings
      notes
      instructions
      ingredients {
        value
        unit
        title
      }
      updatedAt
    }
  }
`;

export default function useRecipeByIdQuery(recipeId, overrides = {}) {
  const res = useQuery(recipeQuery, {
    variables: { recipeId },
    ...overrides,
  });
  return { ...res, recipe: getFirstResult(res.data) };
}
