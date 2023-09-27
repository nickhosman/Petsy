import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { useState } from "react";
import { createReviewThunk, fetchAllProducts, getAllReviewsThunk, updateReview } from "../../store/product";
import { StarRating } from "./StarRating";

function ReviewForm({review, formType}) {
  const dispatch = useDispatch()
  const [details, setDetails] = useState("")
  const [stars, setStars] = useState(0)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()
  const onClick = (index) => {
    setStars(index)
  }

  const product = useSelector(state => state.products?.singleProduct)
  const user = useSelector(state => state.session.user)
  console.log('PRODUCT', product.id)
  console.log('REVIEW ID', product.ProductReviews.id)
  console.log("KJNMKMKMKM", formType)

  const handleSubmitReview = async(e) => {
    e.preventDefault()
    setErrors({})

    let newReview = {
      productId: product.id,
      userId: user.id,
      stars,
      details
    }
    
    if (formType === 'Update Review') {
      try {
        newReview.id = review.id
        const updatedReview = await dispatch(updateReview(newReview))
        if(updatedReview){
          dispatch(getAllReviewsThunk(newReview))
        }
      } catch (error) {
        const data = await error.json()
        if(data && data.errors) {
          setErrors(data.errors)
        }
      }
    } else if (formType === 'Create A Review') {
      try {
        const createdReview = await dispatch(createReviewThunk(newReview))

        if(createdReview) {
          dispatch(getAllReviewsThunk(newReview))
        }
      } catch (error){
        const data = await error.json()
        if(data && data.errors) {
          setErrors(data.errors)
        }
      }
    }
  }
  // const handleSubmitReview = (e) => {
  //   e.preventDefault()
  //   setErrors({})
  //   dispatch(createReviewThunk(
  //    product.id,
  //    user.id,
  //    stars,
  //    details
  //   ))
  //   .then((review) => {
  //     dispatch(fetchAllProducts())
  //     dispatch(getAllReviewsThunk(product.id))
  //     closeModal()
  //   })
  //   .catch(async(res) => {
  //     console.error(res)
  //     const data = await res.json()
  //     if (data && data.errors) {
  //       setErrors(data.errors)
  //     }
  //   })
  // }

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
