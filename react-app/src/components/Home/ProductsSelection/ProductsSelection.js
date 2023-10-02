import React from 'react'
import './ProductSelection.css'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ProductsSelection = ({ product }) => {
  const history = useHistory()
  const handleViewProductDetail = e => {
    e.preventDefault()
    console.log(e.target)
    history.push(`/products/${product.id}`)
  }

  if(!product) return null

  const starArray = [...Array(5).keys()].map(star => star + 1)
  const starRating = (rating) => starArray.map(star =>
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      color={rating >= star ? "rgb(210, 39, 39)" : "lightgray"} />
      )

  return (
    <div id="selection-div" onClick={handleViewProductDetail} >
            <div id="selection-img-div">
              <img id="selection-img" src={product?.previewImage} alt="" />
            </div>
            <div className='selection-info'>
              <div className='selection-name-likes'>
              <p className='selection-name'>{product?.name}</p>
                {/* <div className='selection-likes'>
                <i onClick={() => alert('Favoriting from home feature coming soon!')} class="fa-regular fa-heart fa-xs"></i>
                <p>{Math.floor(Math.random() * 500) + 100}</p>
                </div> */}
              </div>
              <p className='selection-seller'>{product?.seller.username}</p>
              <div className="star-rating-container">
              {starRating(product?.averageRating)}
              </div>
            </div>
          </div>

  )
}

export default ProductsSelection
