import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { useState } from "react";
import { createReviewThunk, fetchAllProducts, getAllReviewsThunk, updateReviewThunk, fetchProductDetail } from "../../store/product";
import { StarRating } from "./StarRating";
import './ReviewForm.css'

function ReviewForm({review, formType}) {
  const dispatch = useDispatch()
  const [details, setDetails] = useState(review.details)
  const [stars, setStars] = useState(review.stars)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  const onClick = (index) => {
    setStars(index)
  }

  const product = useSelector(state => state.products?.singleProduct)
  const user = useSelector(state => state.session.user)

  const handleSubmitReview = async(e) => {
    e.preventDefault()
    setErrors({})

    if (formType === 'Update Review') {
      try {
        const updatedReview = await dispatch(updateReviewThunk(review.id, user, stars, details))
        if(updatedReview) {
          dispatch(fetchProductDetail(product.id))
        }
      } catch (error) {
        setErrors(error.errors)
        return
      }
      closeModal()

    } else if (formType === 'Create A Review') {
      try {
        const newReview = await dispatch(createReviewThunk(product.id, user, stars, details))
        if(newReview) {
          dispatch(fetchProductDetail(product.id))
        }
      } catch (error){
        setErrors(error.errors)
        return
      }
      closeModal()
    }
  }

  return (
    <div className="review-form">
      <h2 className="form-title">{formType}</h2>
      <div className="product-name-img">
        <h4 className="product-name">{product.name}</h4>
        <img className='product-img' src={product.ProductImages[0].imageUrl}/>
      </div>
      <form onSubmit={handleSubmitReview}>
        <div className="review-star-rating">
          <h3 className="rating-star-container">Rating:
            <StarRating
              stars={stars}
              onClickStars={(index) => onClick(index)}
              className='review-star-buttons'
            />
          </h3>
        </div>
        <div>
        <p className="product-review-textbox-header">Please write product review here:</p>
          <textarea
            style={{width: '400px', height: '150px', border: 'solid 1px black', resize: "none"}}
            name='text'
            rows='5'
            cols='6'
            label="Leave your review..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        {errors.details && <p id='error-msg'>*{errors.details}</p>}
        </div>
        <div className='update-create-submit-button'>
          <button onSubmit={handleSubmitReview} type='submit'>{formType === 'Create A Review' ? 'Create Review' : 'Update Review'}</button>
        </div>
      </form>
    </div>
  )
}


export default ReviewForm
