import React from "react";
import { NavLink } from 'react-router-dom';
import './ProductCard.css'

function ProductCard({ product }) {
  return (
    <div className="k-productcard-container">
      <NavLink style={{ textDecoration: "none", color: "black" }} to={`/products/${product.id}`}>
        <div>
          <img className='k-productcard-image' src={product.previewImage} alt=''></img>
        </div>
        <div>
          <h4>{product.name}</h4>
          <p>{product.averageRating}</p>

          <p>${product.price}</p>
        </div>
      </NavLink>
    </div>
  )
}

export default ProductCard


