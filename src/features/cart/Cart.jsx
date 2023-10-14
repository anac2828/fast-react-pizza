import { useSelector, useDispatch } from 'react-redux';

import { getCart, clearCart } from './cartSlice';

import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='text-xl font-semibold mt-7'>
        Your cart, {username}
      </h2>
      <ul className='mt-3 border-b divide-y divide-stone-200'>
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button type='primary' to='/order/new'>
          Order pizzas
        </Button>
        <Button
          onClick={() => dispatch(clearCart())}
          type='secondary'>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
