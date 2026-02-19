import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './ui/Home'
import Error from './ui/Error'
import AppLayout from './ui/AppLayout'
import Menu, { loader as menuLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder'
import Order, { loader as orderLoader } from './features/order/Order'
import { action as updateOrderAction } from './features/order/UpdateOrder'
import { BASE_URL } from './utils/config'

// Using createBrowserRouter will enable us to fetch data from an API or a form when using react router v6.4
const router = createBrowserRouter([
  // errors in nested routes will bubble up to AppLayout
  {
    element: <AppLayout />, // This will be the layout for all routes (Parent route)
    errorElement: <Error />, // Errors from nested routes will bubble up to this error element unless they have their own errorElement defined
    // Nested routes will be rendered inside the <Outlet /> component in AppLayout
    children: [
      { path: BASE_URL, element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader, // STEP 2 - This will call the loader function in Menu.jsx to fetch the menu data when user goes to /menu path
        // To handle error from API
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction, // STEP 2 - This will call the action function in CreateOrder.jsx when the form is submitted in CreateOrder.jsx and will pass any errors to the component.
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader, // STEP 2 - This will call the loader function in App.jsx
        errorElement: <Error />,
        action: updateOrderAction, // In the updateOrder.jsx
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
