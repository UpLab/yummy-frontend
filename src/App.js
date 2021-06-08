import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RootRouter from './router/RootRouter';
import { ThemeContextProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <RootRouter />
      <ToastContainer />
    </ThemeContextProvider>
  );
}
