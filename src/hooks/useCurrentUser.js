import { useQuery, gql } from '@apollo/client';

const meQuery = gql`
  query me {
    me {
      _id
      email
    }
  }
`;

export default function useCurrentUser() {
  const { loading, error, data, ...rest } = useQuery(meQuery);

  return [data?.me, { loading, error, ...rest }];
}
