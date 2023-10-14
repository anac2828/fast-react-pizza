// import { useState } from 'react';
import {
	Form,
	redirect,
	useActionData,
	useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str
	);

const fakeCart = [
	{
		pizzaId: 12,
		name: 'Mediterranean',
		quantity: 2,
		unitPrice: 16,
		totalPrice: 32,
	},
	{
		pizzaId: 6,
		name: 'Vegetale',
		quantity: 1,
		unitPrice: 13,
		totalPrice: 13,
	},
	{
		pizzaId: 11,
		name: 'Spinach and Mushroom',
		quantity: 1,
		unitPrice: 15,
		totalPrice: 15,
	},
];

// STYLES

const stylesInputGroup = 'flex flex-col gap-2 mb-5 sm:flex-row';
const stylesLabel = 'sm:basis-40';

function CreateOrder() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const formErrors = useActionData();
	// const [withPriority, setWithPriority] = useState(false);
	const cart = fakeCart;

	return (
		<div className='px-4 py-6'>
			<h2 className='mb-8 text-xl font-semibold'>
				Ready to order? Let&apos;s go!
			</h2>

			{/* React-router-dom form */}
			{/* <Form method='POST' action='/order/new'> */}
			<Form method='POST' action=''>
				<div className={stylesInputGroup}>
					<label className={stylesLabel}>First Name</label>
					<input
						className='input grow'
						type='text'
						name='customer'
						required
					/>
				</div>

				<div className={stylesInputGroup}>
					<label className={stylesLabel}>Phone number</label>
					<div className='grow'>
						<input
							className='w-full input'
							type='tel'
							name='phone'
							required
						/>
						{formErrors?.phone && (
							<p className='p-2 mt-2 text-xs text-red-700 bg-red-100 rounded-md'>
								{formErrors.phone}
							</p>
						)}
					</div>
				</div>

				<div className={stylesInputGroup}>
					<label className={stylesLabel}>Address</label>
					<div className='grow'>
						<input
							className='w-full input'
							type='text'
							name='address'
							required
						/>
					</div>
				</div>

				<div className='flex items-center gap-5 mb-12'>
					<input
						className='w-6 h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
						type='checkbox'
						name='priority'
						id='priority'
						// value={withPriority}
						// onChange={(e) => setWithPriority(e.target.checked)}
					/>
					<label className='font-medium' htmlFor='priority'>
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input
						type='hidden'
						name='cart'
						value={JSON.stringify(cart)}
					/>
					<Button type='primary' disabled={isSubmitting}>
						{isSubmitting ? 'Placing order...' : 'Order now'}
					</Button>
				</div>
			</Form>
		</div>
	);
}

// when the Form is submitted react-router will call the action function and pass request that was submitted
// connect action function to route in App.jsx
export async function action({ request }) {
	// form data is provided by the browser
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === 'on',
	};

	// Error handling that will be use by the useActionData() hook.
	const errors = {};

	if (!isValidPhone(order.phone))
		errors.phone = 'Please enter a valid phone number.';

	// check to see if errors object has an is not empty. If there is an error the errors object will be returned.
	if (Object.keys(errors).length > 0) return errors;

	//if no errors create new order
	const newOrder = await createOrder(order);

	return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
