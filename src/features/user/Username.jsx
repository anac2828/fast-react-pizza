import { useSelector } from 'react-redux'

// Componenet displays the username in the header
function Username() {
  // useSelector gives you access to the state in th store
  const username = useSelector((state) => state.user.username)

  if (!username) return null

  return <div className='hidden text-sm font-semibold md:block'>{username}</div>
}

export default Username
