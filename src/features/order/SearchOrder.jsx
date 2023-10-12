import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    // got to the path of the order id. Navigate will add this to the URL
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search order #' className='rounded-full px-4 py-2 text-sm bg-yellow-50 placeholder:text-stone-400 w-32 sm:w-64 focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-20'
      />
    </form>
  );
}

export default SearchOrder;
