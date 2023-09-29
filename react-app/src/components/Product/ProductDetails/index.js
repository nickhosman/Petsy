import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail, getAllReviewsThunk } from '../../../store/product';
import { fetchUserFavorites, fetchDeleteFavorite, fetchAddFavorite } from '../../../store/user';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './ProductDetails.css'
import ShowReviews from '../../Review/ShowReviews/index.js';
import CreateReview from '../../Review/CreateReviews/index'
import OpenModalButton from '../../OpenModalButton';

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products?.singleProduct)
  const allReviews = useSelector((state) => state.products.singleProduct?.ProductReviews)
  const user = useSelector((state) => state.session.user)
  const favorites = useSelector((state) => state.user.Favorites)
  const [isFavorited, setIsFavorited] = useState(false)


  useEffect(() => {
    dispatch(fetchProductDetail(productId));
    dispatch(getAllReviewsThunk(productId));
    if(user) {
      dispatch(fetchUserFavorites(user.id));
    }
  }, [dispatch, user, productId]);

  useEffect(() => {
    if(favorites && product && Object.keys(favorites).includes(String(product.id))) {
      setIsFavorited(true);
    } else if (favorites && product && !Object.keys(favorites).includes(String(product.id))) {
      setIsFavorited(false)
    }
  }, [favorites, product]);

  if(!allReviews || !product || Object.keys(product).length === 0) return null;

  const handleFavorite = async (e) => {
    e.preventDefault()
    if(isFavorited){
      await dispatch(fetchDeleteFavorite(product.id))
    } else if (!isFavorited) {
      await dispatch(fetchAddFavorite(product.id))
      setIsFavorited(!isFavorited);
    }
  }

  const hasReviewed = () => {
    let userReview = false
    for(let i = 0; i < Object.values(allReviews).length; i++) {
      let review = Object.values(allReviews)[i]
      if (user?.id === review?.userId) {
        userReview = true
      }
    }
    return userReview
  }

  return(
    <div className='product-details-container'>
      <div className='productdetails-carousel-container'>
        <Carousel showStatus={false} useKeyboardArrows={true}>
        {product.ProductImages?.map((product, index) => (
          <div className='productdetails-image-container'>
            <img className='productdetails-image' src={product.imageUrl} alt='' key={index}></img>
          </div>))}
        </Carousel>
        {user && user?.id !== product.Seller?.id &&
        <i className={isFavorited ? "fa-solid fa-heart favoritedheart": "fa-regular fa-heart unfavoritedheart"} onClick={handleFavorite}></i>}
        <ShowReviews product={product} user={user} productId={productId}/>
      </div>
      <div className='productdetails-sidebar-container'>
        <div className='productdetails-information'>
            <h4 id='productdetails-price'>${product.price}</h4>
            <h4 id='productdetails-name'>{product.name}</h4>
            <h4 id='productdetails-seller'>{product.Seller?.username}</h4>
            {product.averageRating > 0 ? <h4> {product.averageRating.toFixed(1)} ★</h4> : <h4>New Listing!</h4>}
            <h4 id='productdetails-desc'>{product.description}</h4>
        </div>
        {user && user.id !== product.sellerId && !hasReviewed() ?
          <OpenModalButton
            buttonText='Leave a review'
            modalComponent={<CreateReview />}
            styleClass= 'productdetails-reviewbutton'
          />
          :
          (null)
        }
      </div>
    </div>
  )
}
export default ProductDetails
