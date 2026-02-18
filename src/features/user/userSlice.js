import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAddress } from '../../services/apiGeocoding'

// Will return the cordinates of the user's location
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// Middleware function using createAsyncThunk - createAsyncThunk will create 3 cases (actions below) that we'll use to connect the fetchAddress function too.
// createAsyncThunk needs the action string and async function that will return the payload. /user/fetchAddress is for Redux to use internally
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition()
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    }

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position)
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

    // 3) Then we return an object with the data that we are interested in
    // payload of fulfiled state
    return { position, address }
  },
)

// 1 - initialState
const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
}

// 2 - createSlice to create the reducer and actions than create a redux store in a separate file
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload
    },
  },
  // Reducers for the thunk funciton above (actions are fetchAddress.pending, fetchddress.fulfilled and fetchAddress.rejected returned by the thunk).
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        //If the fetchAddress function returns pending update the status to loading
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        // payload is returned from the fedtAddress function when fulfilled
        state.position = action.payload.position
        state.address = action.payload.address
        state.status = 'idle'
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error'
        state.error =
          'There was a problem getting your addess. Please fill in manually.'
      }),
})

// EXPPORT ACTIONS TO DISPATCH IN COMPONENTS
export const { updateName } = userSlice.actions

// EXPORT REDUCER TO SET UP STORE
export default userSlice.reducer
