import { useSelector } from "react-redux";
import ReviewForm from "../ReviewForm";


const UpdateReview = ({reviewId}) => {

  const review = useSelector((state) => (state.products ? state.products.singleProduct.ProductReviews[reviewId]: {}))
  if(!review) return null

  return(
    <ReviewForm
      review={review}
      formType='Update Review'
    />
  )
}

export default UpdateReview
