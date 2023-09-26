import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviewsThunk } from "../../../store/product"
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./ShowReviews.css"

const ShowReviews = ({productId}) => {

  const allReviews = useSelector(state => state.products.singleProduct?.ProductReviews)
  const product = useSelector(state => state.products?.singleProduct)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllReviewsThunk(productId))
  }, [dispatch, productId])

  const starArray = [...Array(5).keys()].map(star => star + 1)
  const starRating = (rating) => starArray.map(star =>
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      color={rating >= star ? "black" : "lightgray"} />
      )

  const reviewCount = () => {
    if(product.totalReviews === 1) {
      return <h3 className="review-count-avg-rating">{product.totalReviews} Review · ★ {product.averageRating?.toFixed(1)} </h3>
    }else if (product.totalReviews === 0) {
      return <h2>★ New</h2>
    }else {
      return <h3 className="review-count-avg-rating">{product.totalReviews} Reviews · ★ {product.averageRating?.toFixed(1)} </h3>
    }
  }

  const sortReviewDates = (reviewA, reviewB) => {
    const dateA = new Date(reviewA.createdAt)
    const dateB = new Date(reviewB.createdAt)
    return dateB - dateA
  }

  if(!product || !allReviews || Object.keys(product).length === 0) return null;
  return (
    <div className="reviews-container">
      <div className="reviews-count-rating-header">
        {reviewCount()}
        {Object.values(allReviews).sort(sortReviewDates).map((review) => (
          <li className="reviews" key={review.id}>
            <h6>{starRating(review.stars)}</h6>
            <p>{review.User?.username} | {review.createdAt}</p>
            <p>{review.details}</p>
          </li>
        ))}
      </div>
    </div>
  )
}

export default ShowReviews
