import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

function Menu() {
	// returns the data from the loader function below that is connect to the /menu path
	const menu = useLoaderData();
	return (
		<ul className='divide-y divide-stone-200 px-2'>
			{menu.map((pizza) => (
				<MenuItem pizza={pizza} key={pizza.id} />
			))}
		</ul>
	);
}

// fetches data and returns it - Connect loader to router in App.jsx
export async function loader() {
	const menu = await getMenu();
	return menu;
}

export default Menu;
