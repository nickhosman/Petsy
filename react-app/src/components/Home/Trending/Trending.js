import React from 'react'
import { useHistory } from 'react-router-dom'
import './Trending.css'
import Tooltip from '../../Tooltip/Tooltip'

const Trending = ({product}) => {
  const history = useHistory()
  const handleViewProductDetail = e => {
    e.preventDefault()
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
