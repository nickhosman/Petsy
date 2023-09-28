import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { useState } from "react";
import { createReviewThunk, fetchAllProducts, getAllReviewsThunk, updateReviewThunk } from "../../store/product";
import { StarRating } from "./StarRating";

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
  console.log('PRODUCT', product.id)
  console.log("KJNMKMKMKM", formType)

  const handleSubmitReview = async(e) => {
    e.preventDefault()
    setErrors({})

    if (formType === 'Update Review') {
      try {
        await dispatch(updateReviewThunk(review.id, user, stars, details))
      } catch (error) {
        setErrors(error.errors)
        return
      }
      closeModal()

    } else if (formType === 'Create A Review') {
      try {
        await dispatch(createReviewThunk(product.id, user, stars, details))
      } catch (error){
        setErrors(error.errors)
        return
      }
      closeModal()
    }
  }

  return (
    <div>
      <h2>{formType}</h2>
      <div>
        <h4>{product.name}</h4>
        <img src={product.ProductImages[0].imageUrl} style={{ width: '150px'}}/>
      </div>
      <form onSubmit={handleSubmitReview}>
        <div>
          <h3>Rating:
            <StarRating
              stars={stars}
              onClickStars={(index) => onClick(index)}
            />
          </h3>
        </div>
        <div>
        <p>Please write product review here:</p>
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
        {errors.details && <p>{errors.details}</p>}
        </div>
        <button onSubmit={handleSubmitReview} type='submit'>{formType === 'Create A Review' ? 'Create Review' : 'Update Review'}</button>
      </form>
    </div>
  )
}


export default ReviewForm
