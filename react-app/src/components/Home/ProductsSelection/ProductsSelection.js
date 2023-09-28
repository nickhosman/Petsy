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

  console.log(product)
  return (
    <div id="selection-div" onClick={handleViewProductDetail} >
            <div id="selection-img-div">
              <img id="selection-img" src={product?.previewImage} alt="" />
            </div>
            <p>{product?.name}</p>
          </div>

  )
}

export default ProductsSelection
