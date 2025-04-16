import { Provider } from 'react-redux';
import { store } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AddTransaction from './components/AddTransaction';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
  
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/transactions', element: <TransactionsPage /> },
      { path: '/add-transaction', element: <AddTransaction /> },
    ],
  },
]);


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
