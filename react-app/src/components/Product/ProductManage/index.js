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
        <img className='manageproduct-image' src={product.previewImage} alt=''></img>
      </div>
      <div>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
      <div className='manageproduct-buttoncontainer'>
      {isListing && <button onClick={handleViewProductForm}>Update</button>}
      {isListing ? <OpenModalButton buttonText='Remove' modalComponent={<DeleteProductModal listing={product}/>}/> : <button onClick={handleRemoveFavorite}>Unfavorite</button>}
      </div>
  </div>
  )
}

export default ProductManage
