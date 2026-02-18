import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

export default function UpdateOrder() {
  // useFetcher to fetch data from a route without navigating to it.
  const fetcher = useFetcher()

  // When the form is submitted it will update the order on /order/:orderId route using the action below
  //fetcher.Form will reload the page with the updated data
  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make priority</Button>
    </fetcher.Form>
  )
}

// From request and params are passed by the ROUTER-DOM. Action will be called in the /order/:orderid route
// eslint-disable-next-line no-unused-vars
export async function action({ request, params }) {
  const data = { priority: true }
  await updateOrder(params.orderId, data)
  return null
}
