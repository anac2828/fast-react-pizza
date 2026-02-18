import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchOrder() {
  // State updated when user types in the Search Order input field.
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (!query) return
    // Go to order/:orderId and display Order.jsx
    navigate(`/order/${query}`)
  }

  return (
    // Form will be submitted when user presses enter.
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search order #'
        className='w-32 px-4 py-2 text-sm transition-all duration-300 rounded-full bg-yellow-50 placeholder:text-stone-400 sm:w-64 focus:w-72 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-20'
      />
    </form>
  )
}

export default SearchOrder
