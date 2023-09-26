import React from 'react'
import './ProductManage.css'
import OpenModalButton from '../../OpenModalButton'
import DeleteProductModal from '../../DeleteProductModal'
import { useHistory } from 'react-router-dom'


function ProductManage({ listing }) {
  const history = useHistory()

  const handleViewProductForm = e => {
    e.preventDefault()
    history.push(`/products/${listing.id}/edit`)
  }

  return (
    <div className='manageproduct-container'>
      <div>
        <img className='manageproduct-image' src={listing.previewImage} alt=''></img>
      </div>
      <div>
        <p>{listing.name}</p>
        <p>{listing.price}</p>
      </div>
      <div className='manageproduct-buttoncontainer'>
      <button onClick={handleViewProductForm}>Update</button>
      <OpenModalButton buttonText='Remove' modalComponent={<DeleteProductModal listing={listing}/>}/>
      </div>
  </div>
  )
}

export default ProductManage
