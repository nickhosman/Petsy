/** Action Type Constants: */
export const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS'
export const SEARCH_PRODUCTS = 'products/SEARCH_PRODUCTS'
export const GET_PRODUCT = 'products/GET_PRODUCT'
export const EDIT_PRODUCT = 'products/EDIT_PRODUCT'
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
export const LOAD_PRODUCTTAG = 'reviews/LOAD_PRODUCTTAG'
export const CREATE_PRODUCTTAG = 'reviews/LOAD_PRODUCTTAG'


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

export const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

export const editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})

export const loadReviews = reviews => ({
  type: LOAD_REVIEWS,
  reviews
})

export const createReview = (review, user) => ({
  type: CREATE_REVIEW,
  payload: { review, user }
})

export const loadProductTag = productTag => ({
  type: LOAD_PRODUCTTAG,
  productTag
})
export const createProductTag = productTag => ({
  type: CREATE_PRODUCTTAG,
  productTag
})

export const updateReview = (review, user) => ({
  type: UPDATE_REVIEW,
  payload: {review, user}
})

export const deleteReview = reviewId => ({
  type: DELETE_REVIEW,
  reviewId
})



/** Thunk Action Creators: */
export const fetchAllProducts = () => async (dispatch) => {
  const response = await fetch('/api/products')
  if (response.ok) {
    const data = await response.json()
    dispatch(loadProducts(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
};

export const fetchSearchedProducts = (searchTerm) => async (dispatch) => {
  const res = await fetch(`/api/search/?q=${searchTerm}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(searchProducts(data))
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

export const fetchProductDetail = productId => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`)
  if (response.ok) {
    const productDetails = await response.json()
    dispatch(getProduct(productDetails))
    return productDetails
  } else {
    let errors = await response.json()
    return errors
  }
}

export const fetchCreateProduct = product => async (dispatch) => {
  const response = await fetch("/api/products/new", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
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

export const fetchAddImageToProduct = (productId, url, preview) => async (dispatch) => {
  if (url === "") return null
  const response = await fetch(`/api/products/${productId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "preview": preview,
      "image_url": url,
      "product_id": productId
    })
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchUpdateProduct = (product, productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
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

// GET ALL REVIEWS
export const getAllReviewsThunk = (productId) => async dispatch => {
  const response = await fetch(`/api/products/${productId}/reviews`)

  if (response.ok) {
    const reviews = await response.json()
    dispatch(loadReviews(reviews))
    return reviews
  } else {
    let errors = await response.json()
    return errors
  }
}

// CREATE A REVIEW
export const createReviewThunk = (productId, user, stars, details) => async dispatch => {
  const response = await fetch(`/api/products/${productId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stars, details })
  })

  if (response.ok) {
    const review = await response.json()
    dispatch(createReview(review, user))
    return review
  }else {
    throw await response.json()
  }
}

  // UPDATE A REVIEW

export const updateReviewThunk = (reviewId, user, stars, details ) => async dispatch => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({stars, details})
  })
  if (response.ok) {
    const review = await response.json()
    dispatch(updateReview(review, user))
    return review
  } else {
    throw await response.json()
  }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(deleteReview(reviewId))
  } else {
    let errors = await response.json()
    return errors
  }
}

// GET ALL PRODUCT TAGS
export const getProductTag = () => async (dispatch) => {
  const response = await fetch('/api/products/:productid/tags')
  if (response.ok) {
    const data = await response.json()
    dispatch(loadProductTag(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
};

// CREATE A TAG FOR A PRODUCT
export const CreateProductTag = (productId,productTag )=> async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/tags`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productTag)
  })

  if (response.ok) {
    const newProductTag = await response.json()
    dispatch(createProductTag(newProductTag))
    return newProductTag
  } else {
    let errors = await response.json()
    return errors
  }
}


const initialState = {}
const productReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_PRODUCTS:
      newState = {
        ...state,
        ...action.products
      }
      console.log(newState)
      return newState
    case SEARCH_PRODUCTS:
      newState = {
        ...state,
        searchProducts: {
          ...action.products
        }
      }
      console.log(newState)
      return newState
    case GET_PRODUCT:
      newState = {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          ...action.product
        }
      }
      return newState
      case LOAD_REVIEWS:
        newState = {...state,
          singleProduct: {...state.singleProduct, ProductReviews: action.reviews.Reviews }}
        return newState
      case CREATE_REVIEW:
      case UPDATE_REVIEW:
        const newReview = action.payload.review
        return {...state, singleProduct: {...state.singleProduct, ProductReviews: {...state.singleProduct.ProductReviews, [newReview.id]: {...newReview, User: action.payload.user}}}}
      case DELETE_REVIEW:
        newState = {...state}
        console.log("NEW STATE", newState)
        delete newState.singleProduct.ProductReviews[action.reviewId]
        return newState
      case LOAD_PRODUCTTAG:
      newState={
        ...state,
        singleProduct:{
          ...state.singleProduct,
          productTags:action.productTag
        }
      }
      case CREATE_PRODUCTTAG:
      newState={
        ...state,
        singleProduct:{
          ...state.singleProduct,
          productTags:action.productTag
        }
      }
      default:
        return state
  };
}

export default productReducer
