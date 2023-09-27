
export const LOAD_LISTINGS= 'users/LOAD_LISTINGS'
export const REMOVE_LISTING = 'users/REMOVE_LISTING'
export const LOAD_FAVORITES = 'users/LOAD_FAVORITES'
export const REMOVE_FAVORITE = 'users/REMOVE_FAVORITE'

export const loadListings = products => ({
  type: LOAD_LISTINGS,
  products
})

export const removeListing = productId =>({
  type:REMOVE_LISTING,
  productId
})

export const loadFavorites = products => ({
  type: LOAD_FAVORITES,
  products
})

export const removeFavorite = productId => ({
  type: REMOVE_FAVORITE,
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

export const fetchDeleteListing = productId => async(dispatch) => {
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

export const fetchUserFavorites = (userId) => async(dispatch) => {
  const response = await fetch(`/api/users/${userId}/favorites`)
  if(response.ok) {
    const data = await response.json()
    dispatch(loadFavorites(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchDeleteFavorite = productId => async(dispatch) => {
  const response = await fetch(`/api/favorites/${productId}`, { method:'DELETE' })
  if(response.ok) {
    const data = await response.json()
    dispatch(removeFavorite(productId))
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
    case LOAD_FAVORITES:
      console.log('first', newState)
      newState = {
        ...state,
        "Favorites" : {...action.products}
      }
      console.log('second', newState)
      return newState
    case REMOVE_FAVORITE:

      newState = {
        ...state,
        "Favorites" : { ...state.Favorites }
      }

      delete newState.Favorites[action.productId]

      return newState
    default:
      return state
  }
}

export default userReducer
