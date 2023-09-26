import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { createReviewThunk } from "../../../store/product";

function CreateReviewForm({}) {
  const product = useSelector(state => state.products?.singleProduct)
  const dispatch = useDispatch()
  const [details, setDetails] = useState("")
  const [stars, setStars] = useState(0)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  console.log('PRODUCT', product)
  const user = useSelector(state => state.session.user)
  console.log('USER', user)

  const handleSubmitReview = (e) => {
    e.preventDefault()

    dispatch(createReviewThunk(
      stars,
      details,
      product.id,
      user.id
    ))
    .then((review) => {
      const newTotalReviews = product.totalReviews + 1
      const newAverageRating = (product.averageRating * product.totalReviews + stars) / newTotalReviews
    })
  }
}
