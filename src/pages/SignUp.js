import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import paths from '../router/paths';
import useAPIMethod from '../hooks/useAPIMethod';
import APIService from '../services/APIService';
import AuthForm from '../components/auth/AuthForm';
import AuthCenteredCard from '../components/auth/AuthCenteredCard';

export default function SignUp() {
  const [createAccount, loading] = useAPIMethod({
    call: APIService.createAccount,
    onError: toast.error,
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
        onSubmit={createAccount}
        isSubmitting={loading}
        isLoginForm={false}
      />
    </AuthCenteredCard>
  );
}
