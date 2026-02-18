import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'

import MenuItem from './MenuItem'

function Menu() {
  // STEP 3 - Return the menu data that is fetched from the API in the loader function below
  const menu = useLoaderData()
  return (
    <ul className='px-2 divide-y divide-stone-200'>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  )
}

// STEP 1 - Data fetching function that will be called when user goes to /menu path in App.jsx
export async function loader() {
  const menu = await getMenu()
  return menu
}

export default Menu
