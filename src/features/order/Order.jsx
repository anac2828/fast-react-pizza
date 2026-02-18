import { useLoaderData, useFetcher } from 'react-router-dom'
import { getOrder } from '../../services/apiRestaurant'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers'
import OrderItem from './OrderItem'
import { useEffect } from 'react'
import UpdateOrder from './UpdateOrder'

function Order() {
  //STEP 3 - useLoaderData will return the data that we return in the loader function in App.jsx (Written below)
  const order = useLoaderData()

  // useFetcher to fetch data without having to navigate to the /menu route
  const fetcher = useFetcher()

  // We need to load data after component loads. useEffect will only when the fetcher changes.
  useEffect(() => {
    //fetcher will run oly when there is no data and it is in 'idle'
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
  }, [fetcher])

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    status,
    id,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order
  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  return (
    <div className='px-4 py-6 space-y-8'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Order #{id} status</h2>

        {/* Priority and order status */}
        <div className='space-x-2'>
          {priority && (
            <span className='px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-red-500 rounded-full text-red-50'>
              Priority
            </span>
          )}
          <span className='px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-green-500 rounded-full text-green-50'>
            {status} order
          </span>
        </div>
      </div>

      {/* Estimated time of arriaval */}
      <div className='flex flex-wrap items-center justify-between gap-2 px-6 py-5 bg-stone-200'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-xs text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* List of ordered pizzas */}
      <ul className='border-b divide-y border-top divide-stone-200'>
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            // look for the pizzas in the menu that have the same id as the pizzas ordered
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
          />
        ))}
      </ul>

      {/* Order total  */}
      <div className='px-6 py-5 space-y-2 bg-stone-200'>
        <p className='text-sm font-medium text-stone-600'>
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-600'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder />}
    </div>
  )
}

// STEP 1 - Create data fetching function that will be called when user goes to 'order/:id' path
// params will be automatically passed by react router
export async function loader({ params }) {
  // API function
  const order = await getOrder(params.orderId)

  return order
}

export default Order
