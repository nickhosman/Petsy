import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../../../store/product';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './ProductDetails.css'

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.singleProduct)
  console.log('x', product)

  useEffect(() => {
    dispatch(fetchProductDetail(productId))
  }, [dispatch]);

  if(!product || Object.keys(product).length === 0) return null;

  return(
    <div className='product-details-container'>
      <div className='productdetails-carousel-container'>
        <Carousel showStatus={false} useKeyboardArrows={true}>
        {product.ProductImages.map((product, index) => (
          <div className='productdetails-image-container'>
            <img className='productdetails-image' src={product.imageUrl} alt='' key={index}></img>
          </div>
        ))}
        </Carousel>
      </div>
        <div className='productdetails-information'>
            <h4 id='productdetails-price'>${product.price}</h4>
            <h4 id='productdetails-name'>{product.name}</h4>
            <h4 id='productdetails-seller'>{product.Seller.username}</h4>
            <h4 id='productdetails-rating'>{product.averageRating} STAR ICON</h4>
            <h4 id='productdetails-desc'>{product.description}</h4>
        </div>
    </div>
  )
}

export default ProductDetails