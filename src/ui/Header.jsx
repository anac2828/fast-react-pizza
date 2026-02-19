import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'
import { BASE_URL } from '../utils/config'

function Header() {
  return (
    <header className='flex items-center justify-between px-4 py-3 uppercase bg-yellow-500 border-b sm:px-6 border-stone-300'>
      <Link className='tracking-widest' to={BASE_URL}>
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  )
}

export default Header
