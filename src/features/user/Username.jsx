import { useSelector } from 'react-redux';

function Username() {
  // gets the username for the store
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className='hidden text-sm font-semibold md:block'>
      {username}
    </div>
  );
}

export default Username;
