import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useMutation, gql } from '@apollo/client';
import AuthManager from '../services/AuthManager';
import paths from '../router/paths';
import AuthForm from '../components/auth/AuthForm';
import AuthCenteredCard from '../components/auth/AuthCenteredCard';
import { getFirstResult } from '../utils/graphql';

const registerMutation = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;
export default function SignUp() {
  const [createAccount, { loading }] = useMutation(registerMutation, {
    onCompleted: (result) => {
      const { accessToken, refreshToken } = getFirstResult(result);
      AuthManager.login({ accessToken, refreshToken });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <AuthCenteredCard>
      <Link to={paths.login} className="float-right">
        <Button type="button" variant="outline-primary">
          Sign in
        </Button>
      </Link>
      <Card.Title>Sign up</Card.Title>
      <AuthForm
        onSubmit={(values) => createAccount({ variables: values })}
        isSubmitting={loading}
        isLoginForm={false}
      />
    </AuthCenteredCard>
  );
}
