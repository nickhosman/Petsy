import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { fetchDeleteListing } from "../../store/user";


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
    <div>
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this listing?</h4>

      <button onClick={handleDeleteProduct}>Yes</button>
      <button onClick={handleCancel}>No</button>
    </div>
  )
}

export default DeleteProductModal
