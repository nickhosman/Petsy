import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviewsThunk } from "../../store/product"
import { useHistory, useParams } from "react-router-dom";


const ShowReviews = ({productId}) => {

  const allReviews = useSelector(state => state.products.singleProduct?.ProductReviews)
  const product = useSelector(state => state.products?.singleProduct)
  console.log('ALL REVIEWS', allReviews)
  console.log(product)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllReviewsThunk(productId))
    console.log('CALLING THUNK')
  }, [dispatch])

  if(!product || !allReviews || Object.keys(product).length === 0) return null;
  return (
    <div className="reviews-container">
      <div className="reviews-count-rating-header">
        <h3 className="review-count-avg-rating">{product.totalReviews} Reviews · ★{product.averageRating} </h3>
        {Object.values(allReviews).map((review) => (
          <li className="reviews" key={review.id}>
            <p>★ {review.stars}</p>
            <p>{review.User?.username} | {review.createdAt}</p>
            <p>{review.details}</p>
          </li>
        ))}
      </div>
    </div>
  )
}

export default ShowReviews
