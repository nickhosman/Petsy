/** Action Type Constants: */
export const LOAD_CATEGORIES ='/categories/LOAD_CATEGORIES'


/**  Action Creators: */
export const loadCategories = categories =>({
  type:LOAD_CATEGORIES,
  categories
})

/** Thunk Action Creators: */

export const fetchCategories = () => async (dispatch) => {
  const res = await fetch('/api/categories')

  if (res.ok) {
    const categories = await res.json()
    dispatch(loadCategories(categories))
    // console.log("fetch categorys action creator", categories)
    return categories
  } else {
    const errors = await res.json()
    return errors
  }
}

// reducer
const initialState={}
const categoryReducer = (state=initialState,action)=>{
  switch (action.type){
    case LOAD_CATEGORIES:
      const updatedState = {
        ...action.categories
      }
      return updatedState
    default:
      return state;
  }
}

export default categoryReducer