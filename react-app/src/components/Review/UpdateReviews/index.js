import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../ReviewForm";
import { getAllReviewsThunk } from "../../../store/product"

const UpdateReview = () => {
  const dispatch = useDispatch()
  const review = useSelector((state) => (state.products ? state.products.singleProduc?.ProductReviews : {}))
  console.log('REVIEW', review)
  dispatch(getAllReviewsThunk(review.id))

  if(!review) return null

  return(
    <ReviewForm
      review={review}
      formType='Update Review'
    />
  )
}

export default UpdateReview
