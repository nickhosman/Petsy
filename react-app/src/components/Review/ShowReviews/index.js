import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviewsThunk } from "../../../store/product"
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./ShowReviews.css"
import UpdateReview from "../UpdateReviews/index"
import OpenModalButton from "../../OpenModalButton";
import DeleteReviewModal from "../DeleteReviews/DeleteReviewModal";

const ShowReviews = ({product, user, productId}) => {
  const dispatch = useDispatch()
  const allReviews = useSelector((state) => state.products.singleProduct?.ProductReviews)

  useEffect(() => {
    dispatch(getAllReviewsThunk(productId))
  }, [dispatch, productId])

  const starArray = [...Array(5).keys()].map(star => star + 1)
  const starRating = (rating) => starArray.map(star =>
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      color={rating >= star ? "rgb(210, 39, 39)" : "lightgray"} />
      )

  const reviewCount = () => {
    if(product.totalReviews === 1) {
      return <h3 className="review-count-avg-rating">{product.totalReviews} Review </h3>
    }else if (product.totalReviews === 0) {
      return <h2>★ New</h2>
    }else {
      return <h3 className="review-count-avg-rating">{product.totalReviews} Reviews</h3>
    }
  }

  const sortReviewDates = (reviewA, reviewB) => {
    const dateA = new Date(reviewA.createdAt)
    const dateB = new Date(reviewB.createdAt)
    return dateB - dateA
  }

  // const upateReview = () => {
  //   if (user.id === Object.keys(allReviews.userId)) {
  //     for()
  //   }
  // }

  if(!product || !allReviews || Object.keys(product).length === 0) return null;
  return (
    <div className="reviews-container">
      <div className="reviews-count-rating-header">
        {reviewCount()}
        {Object.values(allReviews).sort(sortReviewDates).map((review) => (
          <li className="reviews" key={review.id}>
            <div className="singlereview-container">
              <img className='loggedin-defaultprofilepic review-profilepicture' src='https://i.ibb.co/1LCJZZZ/Default-pfp-svg.png'></img>
              <div className="singlereview-info">
                <h6 className="review-stars">{starRating(review.stars)}</h6>
                <p className="review-user-date">{review.User?.firstName} | {review.createdAt}</p>
                <p className="review-details">{review.details}</p>
              </div>
            {user && user.id === review.userId ?
            <div className="productdetails-update-review-reviewbuttons">
              <OpenModalButton
                buttonText='Edit'
                modalComponent={<UpdateReview reviewId={review.id}/>}
                styleClass='productdetails-update-reviewbutton'
                />
              <OpenModalButton
                buttonText='Delete'
                modalComponent={<DeleteReviewModal reviewId={review.id} productId={productId} />}
                styleClass='productdetails-delete-reviewbutton'
                />
            </div>
            : null}
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}

export default ShowReviews
