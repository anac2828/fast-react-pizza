import { Outlet, useNavigation } from 'react-router-dom';

import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Louder';

function AppLayout() {
	const navigation = useNavigation();
	// when navigation.state is equal to "loading" when user goes to '/menu' "isLoading" will be true
	const isLoading = navigation.state === 'loading';
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
			{/* Always visible */}
			<CartOverview />
		</div>
	);
}

export default AppLayout;
