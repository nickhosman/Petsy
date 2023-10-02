import React from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import './ProductCard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ProductCard({ product }) {

  // console.log(product)
  const history = useHistory()
  const handleViewProductDetail = e => {
    e.preventDefault()
    history.push(`/products/${product.id}`)
  }

  const starArray = [...Array(5).keys()].map(star => star + 1)
  const starRating = (rating) => starArray.map(star =>
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      color={rating >= star ? "rgb(210, 39, 39)" : "lightgray"} />
      )

  return (
    <div className="k-productcard-container" onClick={handleViewProductDetail}>
      <div id="product-image-div">
        <img className='k-productcard-image' src={product?.previewImage} alt=''></img>
      </div>
      <div id="product-info-div">
        <h4 className="product-info-name">{product?.name}</h4>
        <div id='productcard-stars' className="star-rating-container">
              {starRating(product?.averageRating)}
              <p id="productcard-seller">{product?.seller?.username}</p>
        </div>
        <p id='productcard-price'>${product?.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
