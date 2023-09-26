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
  console.log('ALL REVIEWS', allReviews)
  console.log(product)
  const rating = product.averageRating

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllReviewsThunk(productId))
    console.log('CALLING THUNK')
  }, [dispatch])

  const starArray = [...Array(5).keys()].map(star => star + 1)
  const starRating = (rating) => starArray.map(star =>
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      color={rating >= star ? "black" : "lightgray"}
    />)
  if(!product || !allReviews || Object.keys(product).length === 0) return null;
  return (
    <div className="reviews-container">
      <div className="reviews-count-rating-header">
        <h3 className="review-count-avg-rating">{product.totalReviews} Reviews · ★ {product.averageRating} </h3>
        {Object.values(allReviews).map((review) => (
          <li className="reviews" key={review.id}>
            <h6>{starRating(rating)}</h6>
            <p>{review.User?.username} | {review.createdAt}</p>
            <p>{review.details}</p>
          </li>
        ))}
      </div>
    </div>
  )
}

export default ShowReviews
