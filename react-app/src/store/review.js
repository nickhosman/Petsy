
const CREATE_REVIEW = 'reviews/createReview'
const EDIT_REVIEW = 'reviews/editReview'
const DELETE_REVIEW = 'reviews/deleteReview'


/** ACTION CREATORS: */

export const createReview = (review, user) => ({
  type: CREATE_REVIEW,
  payload: {review, user}
})

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})

export const editReview = review => ({
  type: EDIT_REVIEW,
  review
})

/** Thunk Action Creators */


//

// REDUCER

const initialState = {}
const reviewReducer = (state = initialState, action) => {
  switch(action.type) {
    // case LOAD_REVIEWS:
    //   const reviewsState = {}
    //   //for each review, make a new obj called reviewsState and store it with its id
    //   // as the key
    //   action.payload.reviews.forEach((review) => {
    //     reviewsState[review.id] = review
    //   })
    //   return {product: reviewsState}
    case CREATE_REVIEW:
      //bring in original state and product property of state obj,
      //create new property in the state using review ID as the key
      //copy the existing review data
      //bring in the user property to the review obj with user data
      return {...state, product: {...state.product}, [action.payload.review.id]: {...action.payload.review, User: action.payload.user}}
    case EDIT_REVIEW:
      //bring in the original state obj
      //copy the action.review into a new review property
      //update the review with the edited data
      return {...state, review: {...action.review}, [action.review.id]: action.review}
    case DELETE_REVIEW:
      const newState = {...state}
      delete newState.product[action.review]
      return newState
    default:
      return state
  }
}

export default reviewReducer
