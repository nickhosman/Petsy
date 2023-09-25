
export const LOAD_LISTINGS= 'users/LOAD_LISTINGS'

export const loadListings = products => ({
  type: LOAD_LISTINGS,
  products
})

export const fetchUserListings = (userId) => async(dispatch) => {

  const response = await fetch(`/api/users/${userId}/products`)
  if(response.ok) {
    const data = await response.json()
    dispatch(loadListings(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

const initialState = {};
const userReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_LISTINGS:
      newState = {
        ...state,
        "Listings" : {...action.products}
      }
      return newState
    default:
      return state
  }
}

export default userReducer
