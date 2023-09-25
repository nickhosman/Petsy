/** Action Type Constants: */
export const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS'
export const GET_PRODUCT = 'products/GET_PRODUCT'
export const EDIT_PRODUCT = 'products/EDIT_PRODUCT'
export const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT'

/**  Action Creators: */
export const loadProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    products
  }
};

export const getProduct = product =>({
  type:GET_PRODUCT,
  product
})

export const editProduct = product =>({
  type:EDIT_PRODUCT,
  product
})

export const removeProduct = productId =>({
  type:REMOVE_PRODUCT,
  productId
})

/** Thunk Action Creators: */
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


export const fetchProductDetail = productId =>async(dispatch)=>{
  const response = await fetch('/api/products/:productid')
  if(response.ok){
    const productDetails= await response.json()
    dispatch(getProduct(productDetails))
    return productDetails
  }else{
    let errors = await response.json()
    return errors
  }
}


export const createProduct = product => async (dispatch) =>{
  const response = await fetch("/api/products/new",{
    method:"POST",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify(product)
  })

  if (response.ok) {
    const newProduct = await response.json()
    dispatch(getProduct(newProduct))
    return newProduct
  } else {
    let errors = await response.json()
    return errors
  }
}

export const updateProduct = product => async (dispatch) =>{
  const response = await fetch(`/api/products/${product.id}`,{
    method:"POST",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify(product)
  })

  if (response.ok) {
    const updateProduct = await response.json()
    dispatch(getProduct(updateProduct))
    return updateProduct
  } else {
    let errors = await response.json()
    return errors
  }
}

export const deleteProduct = productId => async(dispatch)=>{
  const response = await fetch(`/api/products/${productId}`,{
    method:'DELETE'
  })

  if(response.ok){
    dispatch(removeProduct())
  } else {
    const errors = await response.json()
    return errors
  }
}


// product reducer
// products: {
//   Products: {
//     [productId]: {
//          ...productData
//     },
//   },
//   singleProduct: {
//      ...productData,
//       ProductImages: [...imagesData],
//         Seller: {
//        ...sellerData,
//      },
//   },
// },
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
