import React from 'react'
import './ProductSelection.css'
import { useHistory } from 'react-router-dom'

const ProductsSelection = ({ product }) => {
  const history = useHistory()
  const handleViewProductDetail = e => {
    e.preventDefault()
    console.log(e.target)
    history.push(`/products/${product.id}`)
  }
  let fullStars;

  if(!product) return null
  console.log(typeof product?.averageRating)
  if(product && product?.averageRating) {
    let average = product?.averageRating;
    fullStars = Math.floor(average);
  }
  return (
    <div id="selection-div" onClick={handleViewProductDetail} >
            <div id="selection-img-div">
              <img id="selection-img" src={product?.previewImage} alt="" />
            </div>
            <div className='selection-info'>
              <p className='selection-name'>{product?.name}</p>
              <p className='selection-seller'>{product?.seller.username}</p>
              <div className="star-rating-container">
                {Array.from({length: fullStars}).map((star, index) => (
                <i key={index} className="fa-solid fa-star fa-reviewstar"></i>))}
              </div>
            </div>
          </div>

  )
}

export default ProductsSelection
