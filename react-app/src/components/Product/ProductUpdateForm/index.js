import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductDetail, fetchUpdateProduct, getAllReviewsThunk } from "../../../store/product";
import catto from '../../images/catto.svg'

function ProductUpdateForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productId } = useParams()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("1");
  const [errors, setErrors] = useState({})


  useEffect(() => {
    dispatch(fetchProductDetail(productId)).then((response) => {
      setName(response.name);
      setDescription(response.description);
      setPrice(response.price);
      setCategory(response.categoryId)
    })
  }, [dispatch, productId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name,
      description,
      price,
      category_id: Number(category)
    }

    // dispatch(fetchUpdateProduct(payload, productId))
    // .then((updatedProduct) => {
    //   if(updatedProduct && updatedProduct.id) {
    //     dispatch(fetchProductDetail(updatedProduct.id))
    //     dispatch(getAllReviewsThunk(updatedProduct.id))
    //     history.push(`/products/${updatedProduct.id}`)
    //   }
    // })
    // .catch(async(error) => {
    //   const data = await error.json()
    //   if (data && data.errors) {
    //     setErrors(data.errors)
    //   }
    // })

    const response = await dispatch(fetchUpdateProduct(payload, productId))
    if(response.errors) {
      setErrors(response.errors)
    } else {
      dispatch(fetchProductDetail(response.id))
      dispatch(getAllReviewsThunk(response.id))
      history.push(`/products/${response.id}`)
    }
  }

  return(
    <div className="n-product-form-wrapper">
    <h1>Update Your Listing</h1>
    <form onSubmit={handleSubmit}>
      <label>
      <h2 className='form-header'>What are you selling?</h2>
      <p className="form-subheader">Give your listing a creative name for all (animals included) to see!</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {errors && errors.name && <p id='error-msg'>*{errors.name}</p>}
      <label>
        <h2 className='form-header'>Care to share the details?</h2>
        <p className="form-subheader">Describe what makes your product special to fellow customers:</p>
        <textarea
          autoComplete="off"
          placeholder="Please write at least 20 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      {errors && errors.description && <p id='error-msg'> {errors.description} </p>}
      </label>
      <label>
        <h2 className='form-header'>Do you have a price in mind?</h2>
        <p className="form-subheader">Competitive pricing may help your product stand out and be seen more frequently.</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      {errors && errors.price && <p id='error-msg'>{errors.price}</p>}
      <label>
        <h2 className='form-header'>Who's it for?</h2>
        <p className="form-subheader">Choose a category that fits the type of animal your product is suited for.</p>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={1}>Dog</option>
          <option value={2}>Cat</option>
          <option value={3}>Aquatic</option>
          <option value={4}>Reptile</option>
          <option value={5}>Others</option>
        </select>
      </label>
      <button className="button-form" type="submit">Update Listing!</button>
    </form>
  </div>
  )
}

export default ProductUpdateForm
