/** Action Type Constants: */
export const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS'
export const SEARCH_PRODUCTS = 'products/LOAD_PRODUCTS'
export const GET_PRODUCT = 'products/GET_PRODUCT'
export const EDIT_PRODUCT = 'products/EDIT_PRODUCT'
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW'

/**  Action Creators: */
export const loadProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    products
  }
};
export const searchProducts = (products) => {
  return {
    type: SEARCH_PRODUCTS,
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

export const loadReviews = reviews => ({
  type: LOAD_REVIEWS,
  reviews
})

export const createReview = (review, user) => ({
  type: CREATE_REVIEW,
  payload: {review, user}
})


/** Thunk Action Creators: */
export const fetchAllProducts = () => async(dispatch) => {
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

export const fetchSearchedProducts = (searchTerm) =>async (dispatch) =>{
  const res = await fetch(`/api/search/?q=${searchTerm}`)
  if(res.ok){
    const data = await res.json()
    dispatch(searchProducts(data))
    return data
  }else{
    const errors = await res.json()
    return errors
  }
}

export const fetchProductDetail = productId =>async(dispatch)=>{
  const response = await fetch(`/api/products/${productId}`)
  if(response.ok){
    const productDetails= await response.json()
    dispatch(getProduct(productDetails))
    return productDetails
  }else{
    let errors = await response.json()
    return errors
  }
}

export const fetchCreateProduct = product => async (dispatch) =>{
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

export const fetchAddImageToProduct = (productId, url, preview) => async(dispatch) => {
  if(url === "") return null
  const response = await fetch(`/api/products/${productId}/images`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
    "preview": preview,
    "image_url" : url,
     "product_id" : productId})
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchUpdateProduct = (product, productId) => async (dispatch) =>{
  const response = await fetch(`/api/products/${productId}`,{
    method:"PUT",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify(product)
  })
  console.log(response)
  if (response.ok) {
    const updateProduct = await response.json()
    dispatch(getProduct(updateProduct))
    return updateProduct
  } else {
    let errors = await response.json()
    return errors
  }
}

// GET ALL REVIEWS
export const getAllReviewsThunk = (productId) => async dispatch => {
  const response = await fetch(`/api/products/${productId}/reviews`)

  if(response.ok) {
    const reviews = await response.json()
    dispatch(loadReviews(reviews))
    return reviews
  }else {
    let errors = await response.json()
    return errors
  }
}

// CREATE A REVIEW
export const createReviewThunk = (productId, user, stars, details) => async dispatch => {
  const response = await fetch(`/api/products/${productId}/reviews`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({stars, details})
  })

  if (response.ok) {
    const review = await response.json()
    console.log('REVIEWS', review)
    dispatch(createReview(user, review))
    return review
  }else {
    let errors = await response.json()
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
      console.log(newState)
      return newState
    case SEARCH_PRODUCTS:
      newState = {
         ...state,
         searchProducts:{
          ...action.products
         }
      }
      console.log(newState)
      return newState
    case GET_PRODUCT:
      newState = {
        ...state,
        singleProduct : {
          ...action.product
        }
      }
      return newState
      case LOAD_REVIEWS:
        newState = {...state, singleProduct: {...state.singleProduct, ProductReviews: action.reviews.Reviews}}
        return newState
      case CREATE_REVIEW:
        const newReview = action.payload.review
        console.log('NEW REVIEW', newReview)
        return {...state, singleProduct: {...state.singleProduct, ProductReviews: {...state.singleProduct.ProductReviews, [newReview.id]: newReview}, User: action.payload.user}}
    default:
      return state
  };
}

export default productReducer
