import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useMutation, gql } from '@apollo/client';
import paths from '../router/paths';
import AuthForm from '../components/auth/AuthForm';
import AuthCenteredCard from '../components/auth/AuthCenteredCard';
import AuthManager from '../services/AuthManager';
import { getFirstResult } from '../utils/graphql';

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export default function Login() {
  const [login, { loading: isLoggingIn }] = useMutation(loginMutation, {
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
      <Link to={paths.signUp} className="float-right">
        <Button type="button" variant="outline-primary">
          Sign up
        </Button>
      </Link>
      <Card.Title>Sign in</Card.Title>
      <AuthForm
        onSubmit={async (values) => {
          await login({ variables: values });
        }}
        isSubmitting={isLoggingIn}
        isLoginForm
      />
    </AuthCenteredCard>
  );
}
