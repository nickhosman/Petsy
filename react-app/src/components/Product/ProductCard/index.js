import React from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product }) {

  // console.log(product)
  const history = useHistory()
  const handleViewProductDetail = e => {
    e.preventDefault()
    history.push(`/products/${product.id}`)
  }
  return (
    <div className="k-productcard-container" onClick={handleViewProductDetail}>
      <div id="product-image-div">
        <img className='k-productcard-image' src={product.previewImage} alt=''></img>
      </div>
      <div id="product-info-div">
        <h4>{product.name}</h4>
        <div id="product-rating-div">
          <p>{product.averageRating}</p>
          <i class="fa-solid fa-star fa-reviewstar"></i>
        </div>
        <p id='price'>${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
