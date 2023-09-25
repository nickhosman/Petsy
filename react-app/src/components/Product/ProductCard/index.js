import React from "react";
import { NavLink } from 'react-router-dom';
import './ProductCard.css'

function ProductCard({ product }) {
  console.log(product)
  return (
    <div className="k-productcard-container">
      <div>
        <img className='k-productcard-image' src={product.previewImage} alt=''></img>
      </div>
      <div>
        <h4>{product.name}</h4>
        <p>{product.averageRating}</p>
        <p>${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
