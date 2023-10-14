import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartQty, getTotalCartPrice } from './cartSlice';

function CartOverview() {
  const totalQty = useSelector(getTotalCartQty);
  const totalPrice = useSelector(getTotalCartPrice);

  if (!totalQty) return null;

  return (
    <div className='flex items-center justify-between px-4 py-4 text-sm uppercase bg-stone-800 text-stone-200 sm:px-6 md:text-base'>
      <p className='space-x-4 font-semibold text-stone-300 sm:space-x-6'>
        <span>{totalQty} pizzas</span>
        <span>${totalPrice}</span>
      </p>

      <Link to='/cart'>Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
