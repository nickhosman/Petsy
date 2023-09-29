import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk, getAllReviewsThunk, fetchProductDetail } from "../../../store/product";

function DeleteReviewModal({reviewId, productId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteReview = async(e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(reviewId))
    dispatch(getAllReviewsThunk(productId))
    dispatch(fetchProductDetail(productId))
    closeModal()
  }

  const handleCancel = async(e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove your review?</h4>
      <button onClick={handleDeleteReview}>Yes</button>
      <button onClick={handleCancel}>No</button>
    </div>
  )
}

export default DeleteReviewModal
