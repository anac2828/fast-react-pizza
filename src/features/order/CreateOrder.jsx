import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../../services/apiRestaurant'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import { fetchAddress } from '../user/userSlice'
import Button from '../../ui/Button'
import EmptyCart from '../cart/EmptyCart'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

// STYLES
const stylesInputGroup = 'flex flex-col gap-2 mb-5 sm:flex-row'
const stylesLabel = 'sm:basis-40'

//** Component displays when user navigates to '/order/new' routes by clicking the order pizzas button in the cart.
function CreateOrder() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // useActionData will return error data that we return in the action function in App.jsx (Written below).
  const formErrors = useActionData()

  // useSelector give you access to the state in the store.
  // user state
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user)

  // cart state
  const cart = useSelector(getCart)

  // Calculate Total price to include priority option pricing
  const totalCartPrice = useSelector(getTotalCartPrice)

  // Local state for priority price
  const [withPriority, setWithPriority] = useState(false)

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + Math.floor(priorityPrice)

  // Geo Location - isLoading will be True of False depending on the addressStatus
  const isLoadingAddress = addressStatus === 'loading'

  if (!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>
        Ready to order? Let&apos;s go!
      </h2>

      {/* React-router-dom form - When the Form is submitted react-router will call the action function below and pass the request object */}
      {/* Form updates Remote State by using react-router-dom */}
      {/* <Form method='POST' action='/order/new'> */}
      <Form method='POST'>
        {/* CUSTOMER INFO */}

        {/* Name */}
        <div className={stylesInputGroup}>
          <label className={stylesLabel}>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username} //use defaultValue to pre-fill the name input with the username from the store
            required
          />
        </div>

        {/* Phone number */}
        <div className={stylesInputGroup}>
          <label className={stylesLabel}>Phone number</label>
          <div className='grow'>
            <input className='w-full input' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='p-2 mt-2 text-xs text-red-700 bg-red-100 rounded-md'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className={`${stylesInputGroup} relative`}>
          <label className={stylesLabel}>Address</label>
          <div className='grow'>
            <input
              className='w-full input'
              type='text'
              name='address'
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressError && (
              <p className='p-2 mt-2 text-xs text-red-700 bg-red-100 rounded-md'>
                {addressError}
              </p>
            )}
          </div>

          {/* Get geolocation - button will display only if there is not a latitude and longitute in the state*/}
          {!position.latitude && !position.longitute && (
            <span className='absolute right-[3px] top-[5px] z-50'>
              <Button
                type='small'
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        {/* ORDER PRIORITY CHECKBOX */}
        <div className='flex items-center gap-5 mb-12'>
          <input
            className='w-6 h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>
            Want to yo give your order priority?
          </label>
        </div>

        {/* CART DATA HIDDEN TO USER */}
        <div>
          {/* Hidden input for access to cart data to be submitted with the form */}
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          {/* Hidden input for access to user location data */}
          <input
            type='hidden'
            name='position'
            value={
              position.latitude && position.longitute
                ? `${position.latitude}, ${position.longitute}`
                : ''
            }
          />
          {/* SUBMIT ORDER BUTTON */}
          <Button type='primary' disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

// ** ROUTER DOM ACTION

// STEP 1 -  Action function that will be connected to the /order/new route in App.jsx
export async function action({ request }) {
  // 1 - Form data is provided by the browser
  const formData = await request.formData()
  // Convert formData to a regular object. formData is an array of key value pairs, so we can use Object.fromEntries to convert it to an object.
  const data = Object.fromEntries(formData)
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true', //True if the checkbox is checked, false if not
  }

  // ERROR HANDLING
  const errors = {}

  // Validate phone number
  if (!isValidPhone(order.phone))
    errors.phone = 'Please enter a valid phone number.'

  // Check to see if errors object has an is not empty. If there is an error the errors object will be returned and the CreateOrder component will have access to it.
  if (Object.keys(errors).length > 0) return errors

  // 2 - CREATE ORDER - using react-router
  const newOrder = await createOrder(order)

  //3 -   Hack to get access to cleartCart function from the store. useDispatch can only be used in components not regular functions. Don't not to be used often, since it will cause optimization problems
  store.dispatch(clearCart())

  // Redirect to created order
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
