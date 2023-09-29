import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createProductTag, fetchProductDetail, getAllReviewsThunk, thunkRemoveTag } from '../../../store/product';
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
  const productTagObj = useSelector(state=>state.products?.singleProduct?.tags)
  console.log(productTagObj)
  const [isFavorited, setIsFavorited] = useState(false)
  const [customTagInputClass, setCustomTagInputClass] = useState("hidden");
  const [addTagBtn, setAddTagBtn] = useState("show")
  const [tagInput, setTagInput] = useState("");

  const allProductTags = []
  const tagArr=[]
  for (const key in productTagObj){
    allProductTags.push(productTagObj[key])
  }
  for(const tag of allProductTags){
    tagArr.push(tag.name)
  console.log(tag.name)
  }
  console.log(tagArr)
console.log(allProductTags)
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

  const handleRemoveTag = async (e) => {
    e.preventDefault()
    const tagId = e.target.className
    console.log("AAAAA", tagId)

    await dispatch(thunkRemoveTag(product.id, tagId))
  }

  const handleClickAddTagBtn = (e) => {
    e.preventDefault()
    setCustomTagInputClass("show")
    setAddTagBtn("hidden")
  }

  const handleAddTagClick = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/products/${product.id}/tags/add`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({name: tagInput})
    })

    if (response.ok) {
      const tag = await response.json()
      dispatch(createProductTag(tag))
    } else {
      console.error(response.errors)
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
      <div id='upper-div'>
        <div className='productdetails-carousel-container'>
          <Carousel showStatus={false} useKeyboardArrows={true}>
            {product.ProductImages?.map((product, index) => (
              <div className='productdetails-image-container'>
                <img className='productdetails-image' src={product.imageUrl} alt='' key={index}></img>
              </div>))}
          </Carousel>
          {user && user?.id !== product.Seller?.id &&
            <i className={isFavorited ? "fa-solid fa-heart favoritedheart" : "fa-regular fa-heart unfavoritedheart"} onClick={handleFavorite}></i>}
        </div>
        <div className='productdetails-sidebar-container'>
          <div className='productdetails-information'>
            <h4 id='productdetails-price'>${product.price}</h4>
            <h4 id='productdetails-name'>{product.name}</h4>
            <h4 id='productdetails-seller'>{product.Seller?.username}</h4>
            {product.averageRating > 0 ? <h4> {product.averageRating.toFixed(1)} ★</h4> : <h4>New Listing!</h4>}
            <h4 id='productdetails-desc'>{product.description}</h4>
            <div id='product-tag-div'>
              {allProductTags?.map(tag=>(
                <span id='individual-tag'>{tag.name} {user && user?.id === product.Seller?.id ? <div id="remove-tag" className={tag.id} onClick={handleRemoveTag}>x</div> : null}</span>
              ))}
              {user && user?.id === product.Seller?.id && allProductTags.length < 5 ? <div className={`_add-tag-btn ${addTagBtn}`} onClick={handleClickAddTagBtn}>+</div> : null}
            </div>
            <div id="custom-tag-wrapper">
              <input
                type="text"
                id="custom-tag-div"
                value={tagInput}
                onChange={(e) => {setTagInput(e.target.value)}}
                className={allProductTags.length < 5 ? customTagInputClass : "hidden"}
              />
              <p className={`add-tag-btn ${allProductTags.length < 5 ? customTagInputClass : "hidden"}`} onClick={handleAddTagClick}>Add Tag</p>
            </div>
          </div>
          {user && user.id !== product.sellerId && !hasReviewed() ?
            <OpenModalButton
              buttonText='Leave a review'
              modalComponent={<CreateReview />}
              styleClass='productdetails-reviewbutton'
            />
            :
            (null)
          }
        </div>
      </div>
        <ShowReviews product={product} user={user} productId={productId}/>
    </div>
  )
}
export default ProductDetails
