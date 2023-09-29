import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { fetchDeleteListing } from "../../store/user";
import './Delete.css'


function DeleteProductModal({ listing }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteProduct = async(e) => {
    e.preventDefault();
    console.log(listing.id)
    await dispatch(fetchDeleteListing(listing.id))
    closeModal()
  }

  const handleCancel = async(e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="deletemodal-container">
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this listing?</h4>
      <button className="confirm-yes" onClick={handleDeleteProduct}>Yes</button>
      <button className="confirm-no" onClick={handleCancel}>No</button>
    </div>
  )
}

export default DeleteProductModal
