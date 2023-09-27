import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductDetail, fetchUpdateProduct, getAllReviewsThunk } from "../../../store/product";

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
    //   console.log('xxxxxxxxxxxxxxxxxx', error)
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
        What are you selling?
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Product description
        <textarea
          autoComplete="off"
          placeholder="Please write at least 20 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      {errors.description && <p className="error-message">*{errors.description}</p>}
      </label>
      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={1}>Dog</option>
          <option value={2}>Cat</option>
          <option value={3}>Aquatic</option>
          <option value={4}>Reptile</option>
          <option value={5}>Others</option>
        </select>
      </label>
      <button type="submit">Update Listing</button>
    </form>
  </div>
  )
}

export default ProductUpdateForm
