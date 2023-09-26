import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";

function DeleteProductModal({ listing }) {
  return (
    <div>
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this listing?</h4>

      <button>Yes</button>
      <button>No</button>
    </div>
  )
}

export default DeleteProductModal
