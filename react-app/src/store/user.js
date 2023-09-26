
export const LOAD_LISTINGS= 'users/LOAD_LISTINGS'
export const REMOVE_LISTING = 'users/REMOVE_LISTING'

export const loadListings = products => ({
  type: LOAD_LISTINGS,
  products
})

export const removeListing = productId =>({
  type:REMOVE_LISTING,
  productId
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

export const fetchDeleteListing = productId => async(dispatch)=>{
  const response = await fetch(`/api/products/${productId}`,{
    method:'DELETE'
  })
  if(response.ok){
    const data = await response.json()
    dispatch(removeListing(productId))
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
    case REMOVE_LISTING:
      newState = {
        ...state,
        "Listings" : { ...state.Listings }
      }
      delete newState.Listings[action.productId]
      return newState
    default:
      return state
  }
}

export default userReducer
