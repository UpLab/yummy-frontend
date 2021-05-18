import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RootRouter from './router/RootRouter';

export default function App() {
  return (
    <>
      <RootRouter />
      <ToastContainer />
    </>
  );
}
