import { useState } from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { updateName } from './userSlice'
import { useNavigate } from 'react-router-dom'

// Component displays in Home component to create a user by entering their name.
function CreateUser() {
  // useDispatch to dispatch actions to the store
  const dispatch = useDispatch()
  // useNavigate to navigate to the menu page after creating the user
  const navigate = useNavigate()
  // Use local state for form inputs
  const [username, setUsername] = useState('')

  // This is updating state in the store by using react-redux.
  function handleSubmit(e) {
    e.preventDefault()

    if (!username) return
    dispatch(updateName(username))
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='mb-8 input w-72'
      />

      {/* Button will display when there is a username in the input field */}
      {username !== '' && (
        <div>
          <Button type='primary'>Start ordering</Button>
        </div>
      )}
    </form>
  )
}

export default CreateUser
