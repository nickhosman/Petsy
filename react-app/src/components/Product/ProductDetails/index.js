import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import productReducer, { createProductTag, fetchProductDetail, getAllReviewsThunk, thunkRemoveTag } from '../../../store/product';
import { fetchUserFavorites, fetchDeleteFavorite, fetchAddFavorite } from '../../../store/user';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './ProductDetails.css'
import ShowReviews from '../../Review/ShowReviews/index.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../Loader/index.js';
import { useCartContext } from '../../../context/Cart.js';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { thunkAddToCart, thunkLoadCart } from '../../../store/cart.js';

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products?.singleProduct)
  const allReviews = useSelector((state) => state.products.singleProduct?.ProductReviews)
  const user = useSelector((state) => state.session.user)
  const favorites = useSelector((state) => state.user.Favorites)
  const productTagObj = useSelector(state=>state.products?.singleProduct?.tags);
  const { showCart, setShowCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false)
  const [customTagInputClass, setCustomTagInputClass] = useState("hidden");
  const [addTagBtn, setAddTagBtn] = useState("show")
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [productFound, setProductFound] = useState(true);
  const [errors, setErrors] = useState({});
  const allProductTags = [];
  const tagArr=[];

  for (const key in productTagObj){
    allProductTags.push(productTagObj[key])
  }
  for(const tag of allProductTags){
    tagArr.push(tag.name)
  };

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

  const handleFavorite = async (e) => {
    e.preventDefault()
    if(isFavorited){
      await dispatch(fetchDeleteFavorite(product.id))
    } else if (!isFavorited) {
      await dispatch(fetchAddFavorite(product.id))
      setIsFavorited(!isFavorited);
    }
  };

  const handleAddToCart = async(e) => {
    e.preventDefault()
    try {
      await dispatch(thunkAddToCart(user.id, productId, quantity))
      await dispatch(thunkLoadCart())
    } catch (errors) {
      console.error(errors)
    } finally {
      setShowCart(!showCart)
    }
  };

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
    e.preventDefault();

    const captalizedTag = tagInput.charAt(0).toUpperCase() + tagInput.slice(1).toLowerCase();

    if (tagArr.includes(captalizedTag)) {
      setErrors({tagInput: "Tag already exists for this product"})
      setTagInput("")
    } else {
      const response = await fetch(`/api/products/${product.id}/tags/add`, {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({name: captalizedTag})
      })

      if (response.ok) {
        const tag = await response.json()
        dispatch(createProductTag(tag))
        dispatch(fetchProductDetail(productId))
        setTagInput("")
        setAddTagBtn("show")
        setErrors({})
      } else {
        const errorsObj = await response.json()
        setErrors({otherErrors: errorsObj.errors.name})
      }
    }
  };

  const starArray = [...Array(5).keys()].map(star => star + 1)
  const starRating = (rating) => starArray.map(star =>
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      color={rating >= star ? "rgb(210, 39, 39)" : "lightgray"} />)

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
            {product.sellerId !== user.id &&
            <>
              <div className='productdetails-cart'>
                <FormControl sx={{ width: 70 }} fullWidth={false}>
                  <InputLabel id="number-select-label">Amount</InputLabel>
                  <Select
                    labelId="number-select-label"
                    id="number-select"
                    value={quantity}
                    label="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    MenuProps={{ disableScrollLock: true }}
                    sx={{
                      height: '30px',
                      fontSize: '1rem',
                      '& .MuiSelect-select': {
                        paddingTop: '4px',
                        paddingBottom: '4px',
                      },
                      '& .MuiSvgIcon-root': {
                        width: '1rem',
                        height: '1rem',
                      }
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                  </Select>
                </FormControl>
                <button className='petsy-button cart-petsy-button' onClick={handleAddToCart}>Add to Cart</button>
              </div>
              {isFavorited ? <button onClick={handleFavorite} id='fav-button' className='petsy-button'>Remove from Favorites</button> :
              <button onClick={handleFavorite} id='fav-button' className='petsy-button'>Add to Favorites</button>}
            </>}
            <div id='product-tag-div' className='productdetails-tags'>
              {allProductTags?.map(tag=>(
                <span id='individual-tag'>{tag.name} {user && user?.id === product.Seller?.id ? <div id="remove-tag" className={tag.id} onClick={handleRemoveTag}>x</div> : null}</span>
              ))}
              {user && user?.id === product.Seller?.id && allProductTags.length < 5 && addTagBtn === "show" ? <div className={`_add-tag-btn ${addTagBtn}`} onClick={handleClickAddTagBtn}>+</div> : null}
            </div>
            {addTagBtn === "hidden" &&
            <div id="custom-tag-wrapper" className="productdetails-tagcontainer">
              <input
                type="text"
                id="custom-tag-div"
                value={tagInput}
                onChange={(e) => {setTagInput(e.target.value)}}
                className={allProductTags.length < 5 ? customTagInputClass : "hidden"}
              />
              <p className={`add-tag-btn ${allProductTags.length < 5 ? customTagInputClass : "hidden"}`} onClick={handleAddTagClick}>Add Tag</p>
            </div>}
            {errors.otherErrors && <p id="error-msg">{errors.otherErrors}</p>}
            {errors.tagInput && <p id="error-msg">{errors.tagInput}</p>}
          </div>
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
