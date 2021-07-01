import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import paths from '../router/paths';
import useAPIMethod from '../hooks/useAPIMethod';
import APIService from '../services/APIService';
import AuthForm from '../components/auth/AuthForm';
import AuthCenteredCard from '../components/auth/AuthCenteredCard';

export default function Login() {
  const [login, isLoggingIn] = useAPIMethod({
    call: APIService.login,
    onError: toast.error,
  });
  return (
    <AuthCenteredCard>
      <Link to={paths.signUp} className="float-right">
        <Button type="button" variant="outline-primary">
          Sign up
        </Button>
      </Link>
      <Card.Title>Sign in</Card.Title>
      <AuthForm onSubmit={login} isSubmitting={isLoggingIn} isLoginForm />
    </AuthCenteredCard>
  );
}
