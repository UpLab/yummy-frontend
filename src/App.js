import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import RootRouter from './router/RootRouter';
import { ThemeContextProvider } from './contexts/ThemeContext';
import apolloClient from './graphql/apolloClient';
import useClearApolloCacheOnLogout from './hooks/useClearApolloCacheOnLogout';

const ApolloCacheClearOnLogout = ({ children }) => {
  useClearApolloCacheOnLogout();
  return children;
};

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ApolloCacheClearOnLogout>
        <ThemeContextProvider>
          <RootRouter />
          <ToastContainer />
        </ThemeContextProvider>
      </ApolloCacheClearOnLogout>
    </ApolloProvider>
  );
}
