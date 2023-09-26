import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../../context/Modal'
import { useState } from "react";
import { createReviewThunk, fetchAllProducts, getAllReviewsThunk } from "../../../store/product";
import { StarRating } from "./StarRating";

function CreateReviewForm({}) {
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

  const handleSubmitReview = (e) => {
    e.preventDefault()
    dispatch(createReviewThunk(
     product.id,
     user.id,
     stars,
     details
    ))
    .then((review) => {
      dispatch(fetchAllProducts())
      dispatch(getAllReviewsThunk(product.id))
      closeModal()
    })
    .catch(async(res) => {
      console.error(res)
      const data = await res.json()
      if (data && data.errors) {
        setErrors(data.errors)
      }
    })
  }

  return (
    <div>
      <h2>Submit Your Review</h2>
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
        <button onSubmit={handleSubmitReview}>Submit Review</button>
      </form>
    </div>
  )
}


export default CreateReviewForm
