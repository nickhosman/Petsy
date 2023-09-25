
const LOAD_PRODUCTS = 'products/loadSpots'

const loadProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    products
  }
};

export const thunkLoadProducts = () => async(dispatch) => {
  const response = await fetch('/api/products')
  if(response.ok) {
    const data = await response.json()
    dispatch(loadProducts(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
};

const initialState = {}
const productReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_PRODUCTS:
      newState = {
         ...action.products
      }
      return newState
    default:
      return state
  };
}

export default productReducer
