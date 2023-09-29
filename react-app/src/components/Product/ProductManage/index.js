import React from 'react'
import { useDispatch } from 'react-redux'
import './ProductManage.css'
import OpenModalButton from '../../OpenModalButton'
import DeleteProductModal from '../../DeleteProductModal'
import { useHistory } from 'react-router-dom'
import { fetchDeleteFavorite } from '../../../store/user'


function ProductManage({ product, isListing }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleViewProductForm = e => {
    e.preventDefault()
    history.push(`/products/${product.id}/edit`)
  }

  const handleRemoveFavorite = async(e) => {
    e.preventDefault()
    await dispatch(fetchDeleteFavorite(product.id))
  }

  return (
    <div className='manageproduct-container'>
      <div>
        <img className='manageproduct-image' src={product.previewImage} alt='' onClick={() => history.push(`/products/${product.id}`)}></img>
      </div>
      <div>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Price:</strong> ${product.price}</p>
      </div>
      <div className='manageproduct-buttoncontainer'>
      {isListing && <button className='button-update' onClick={handleViewProductForm}>Update</button>}
      {isListing ? <OpenModalButton styleClass="button-remove" buttonText='Remove' modalComponent={<DeleteProductModal listing={product}/>}/> : <button className='button-remove' onClick={handleRemoveFavorite}>Remove</button>}
      </div>
  </div>
  )
}

export default ProductManage
