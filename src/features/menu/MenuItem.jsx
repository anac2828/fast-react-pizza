import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { addItem, getCurrentQtyById } from '../cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteItem from '../cart/DeleteItem';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } =
    pizza;
  const currentQty = useSelector(getCurrentQtyById(id));
  const isInCart = currentQty > 0;

  function handleAddToCart() {
    // item object needs to be the same structure as the cart initial state
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className='flex gap-4 py-2'>
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className='flex flex-col grow'>
        <p className='font-medium mt-0.5'>{name}</p>
        <p className='text-sm italic capitalize text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='flex items-center justify-between mt-auto'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}
          {/* will show if pizza is in the cart */}
          {isInCart && <DeleteItem id={id} />}
          {/* will prevent from two of the same pizzas to be added to the cart */}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type='small'>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
