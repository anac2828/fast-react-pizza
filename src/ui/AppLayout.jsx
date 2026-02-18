import { Outlet, useNavigation } from 'react-router-dom'

import CartOverview from '../features/cart/CartOverview'
import Header from './Header'
import Loader from './Louder'

function AppLayout() {
  const navigation = useNavigation()
  // navigation.state will be 'loading' when we are waiting for data to load from the API. Will be used by all routes.
  const isLoading = navigation.state === 'loading' //True or false

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      {isLoading && <Loader />}

      {/* Always visible */}
      <Header />
      <div className='overflow-scroll'>
        <main className='max-w-3xl mx-auto'>
          {/* Nested routes will display here */}
          <Outlet />
        </main>
      </div>
      {/* Visible when an order is added to cart */}
      <CartOverview />
    </div>
  )
}

export default AppLayout
