import { useSelector, useDispatch } from 'react-redux'

import { getCart, clearCart } from './cartSlice'

import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'

// Component displays when user navigates to '/cart' routes by clicking the open cart buttom at bottom or browser window.
function Cart() {
  // useSelector gives you access to the state in the store. useDispatch will update the state with the action functions.
  const username = useSelector((state) => state.user.username)
  const cart = useSelector(getCart)
  const dispatch = useDispatch()

  // IF there are no pizzas in the cart display EmtpryCart component in /cart route
  if (!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='text-xl font-semibold mt-7'>Your cart, {username}</h2>
      <ul className='mt-3 border-b divide-y divide-stone-200'>
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button type='primary' to='/order/new'>
          Order pizzas
        </Button>
        <Button onClick={() => dispatch(clearCart())} type='secondary'>
          Clear cart
        </Button>
      </div>
    </div>
  )
}

export default Cart
