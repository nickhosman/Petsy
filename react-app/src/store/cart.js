export const LOAD_CART = 'cart/LOAD_CART'

export const loadCart = (cart) => {
  return {
    type: LOAD_CART,
    cart
  }
}

export const thunkLoadCart = () => async(dispatch) => {
  const response = await fetch('/api/cart');
  console.log('res', response)
  if(response.ok) {
    const data = await response.json();
    await dispatch(loadCart(data))
    return data
  } else {
    throw await response.json()
  };
};


export const thunkAddToCart = (userId, productId, quantity) => async(dispatch) => {
  const response = await fetch('/api/cart/add', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "userId": userId,
      "productId": productId,
      quantity
    })
  });

  if(response.ok) {
    const data = await response.json();
    return data
  } else {
    throw await response.json()
  };
};

const initialState = {};
const cartReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_CART:
      newState = { ...state, ...action.cart}
      return newState
    default:
      return state
  }
};

export default cartReducer
