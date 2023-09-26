import React from 'react'
import { useHistory } from 'react-router-dom'
import './Trending.css'

const Trending = ({product}) => {
  const history = useHistory()
  const handleViewProductDetail = e => {
    e.preventDefault()
    console.log(e.target)
    history.push(`/products/${product.id}`)
  }
  return (
    <div id="trending-card-div" onClick={handleViewProductDetail} >
      <div id="trending-img-div">
        <img id="trending-img" src={product?.previewImage} alt="" />
      </div>
    
    </div>
  )
}

export default Trending