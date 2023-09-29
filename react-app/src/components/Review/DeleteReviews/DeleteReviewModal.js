import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk, getAllReviewsThunk } from "../../../store/product";
import "./DeleteReviews.css"

function DeleteReviewModal({reviewId, productId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteReview = async(e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(reviewId))
    dispatch(getAllReviewsThunk(productId))
    closeModal()
  }

  const handleCancel = async(e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="confirm-popup-modal">
      <h4 className="confirmation-header">Are you sure you want to remove your review?</h4>
      <div className="cofirmation-buttons">
        <button onClick={handleDeleteReview}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    </div>
  )
}

export default DeleteReviewModal
