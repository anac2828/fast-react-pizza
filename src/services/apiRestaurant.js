const API_URL = 'https://react-fast-pizza-api.onrender.com/api'

// *** GET MENU ****
export async function getMenu() {
  // FETCH MENU DATA FROM API
  const res = await fetch(`${API_URL}/menu`)

  // ERROR HANDLING
  if (!res.ok) throw Error('Failed getting menu')

  // RETURN DATA FROM API
  const { data } = await res.json()
  return data
}

// *** GET ORDER ****
export async function getOrder(id) {
  // FETCH MENU DATA FROM API
  const res = await fetch(`${API_URL}/order/${id}`)

  // ERROR HANDLING
  if (!res.ok) throw Error(`Couldn't find order #${id}`)

  // RETURN DATA FROM API
  const { data } = await res.json()
  return data
}

// *** CREATE ORDER ****
export async function createOrder(newOrder) {
  try {
    // POST NEW ORDER TO API
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // ERROR HANDLING
    if (!res.ok) throw Error()

    // RETURN DATA FROM API
    const { data } = await res.json()
    return data
  } catch {
    throw Error('Failed creating your order')
  }
}

// *** UPDATE ORDER ****
export async function updateOrder(id, updateObj) {
  try {
    // UPDATE ORDER IN API
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // ERROR HANDLING
    if (!res.ok) throw Error()

    // NO NEED TO RETURN DATA FROM API
  } catch (err) {
    throw Error('Failed updating your order')
  }
}
