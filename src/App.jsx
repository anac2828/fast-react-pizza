import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Error from './ui/Error';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';

// This will enable us to fetch data from an API with react router v6
// children are the nested routes
const router = createBrowserRouter([
  // errors in nested routes will bubble up to AppLayout
  {
    element: <AppLayout />,
    // Error from APP
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      // menuLoader function in Menu componet will fetch the data when user goes to /menu path
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        // To handle error from API
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
