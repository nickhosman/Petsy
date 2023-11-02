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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../Loader/index.js';

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products?.singleProduct)
  const allReviews = useSelector((state) => state.products.singleProduct?.ProductReviews)
  const user = useSelector((state) => state.session.user)
  const favorites = useSelector((state) => state.user.Favorites)
  const productTagObj = useSelector(state=>state.products?.singleProduct?.tags)
  const [isFavorited, setIsFavorited] = useState(false)
  const [customTagInputClass, setCustomTagInputClass] = useState("hidden");
  const [addTagBtn, setAddTagBtn] = useState("show")
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [productFound, setProductFound] = useState(true);

  const allProductTags = []
  const tagArr=[]
  for (const key in productTagObj){
    allProductTags.push(productTagObj[key])
  }
  for(const tag of allProductTags){
    tagArr.push(tag.name)
  }

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        await dispatch(fetchProductDetail(productId));
        await dispatch(getAllReviewsThunk(productId));
        if(user) await dispatch(fetchUserFavorites(user.id));
      } catch (error) {
        console.error(error);
        setProductFound(false);
      } finally {
        setLoading(false)
    }
  }
    fetchData();
  }, [dispatch, user, productId]);

  useEffect(() => {
    if(favorites && product && Object.keys(favorites).includes(String(product.id))) {
      setIsFavorited(true);
    } else if (favorites && product && !Object.keys(favorites).includes(String(product.id))) {
      setIsFavorited(false)
    }
  }, [favorites, product]);

  // if(!allReviews || !product || Object.keys(product).length === 0) return null;

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
    await dispatch(thunkRemoveTag(product.id, tagId))
    setAddTagBtn("show")
  }

  const handleClickAddTagBtn = (e) => {
    e.preventDefault()
    setCustomTagInputClass("show")
    setAddTagBtn("hidden")
  }

  const handleAddTagClick = async (e) => {
    e.preventDefault()
    if (tagArr.includes(tagInput)) {
      alert("Tag already exists for product")
      setTagInput("")
    } else {
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
        dispatch(fetchProductDetail(productId))
        setTagInput("")
        setAddTagBtn("show")
      } else {
        console.error(response.errors)
      }
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

  const starArray = [...Array(5).keys()].map(star => star + 1)
  const starRating = (rating) => starArray.map(star =>
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      color={rating >= star ? "rgb(210, 39, 39)" : "lightgray"} />
      )

  if (loading) return <Loader />;

  return(
    <>
    {productFound ?
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
            {product.averageRating > 0 ? <div className="star-rating-container productdetail-star">
              {starRating(product?.averageRating)}
              </div> : <h4>New Listing!</h4>}
            <h4 id='productdetails-desc'>{product.description}</h4>
            <div id='product-tag-div' className='productdetails-tags'>
              {allProductTags?.map(tag=>(
                <span id='individual-tag'>{tag.name} {user && user?.id === product.Seller?.id ? <div id="remove-tag" className={tag.id} onClick={handleRemoveTag}>x</div> : null}</span>
              ))}
              {user && user?.id === product.Seller?.id && allProductTags.length < 5 && addTagBtn === "show" ? <div className={`_add-tag-btn ${addTagBtn}`} onClick={handleClickAddTagBtn}>+</div> : null}
            </div>
            {addTagBtn === "hidden" && <div id="custom-tag-wrapper" className="productdetails-tagcontainer">
              <input
                type="text"
                id="custom-tag-div"
                value={tagInput}
                onChange={(e) => {setTagInput(e.target.value)}}
                className={allProductTags.length < 5 ? customTagInputClass : "hidden"}
              />
              <p className={`add-tag-btn ${allProductTags.length < 5 ? customTagInputClass : "hidden"}`} onClick={handleAddTagClick}>Add Tag</p>
            </div>}
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
      :
    <div className='product-not-found'>
      <h4>Product not found</h4>
      <img src="https://media.tenor.com/vu7LC08jRmwAAAAC/where-are-you-lost.gif"></img>
    </div>
    }
    </>
  )
}
export default ProductDetails
