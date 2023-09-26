import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect} from "react-router-dom";
import { useHistory } from "react-router-dom";
import './ProductForm.css'
import { fetchCreateProduct, fetchAddImageToProduct, fetchProductDetail } from "../../../store/product";

function ProductFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("1");
  const [previewImage, setPreviewImage] = useState("");
  const [otherImage1, setOtherImage1] = useState("");
  const [otherImage2, setOtherImage2] = useState("");
  const [otherImage3, setOtherImage3] = useState("");
  const [otherImage4, setOtherImage4] = useState("");


  // const [tags, setTags] = useState([]);
  // const [errors, setErrors] = useState([]);
  // let tagList = ["clothing", "toys", "halloween", "food"]

  // useEffect(async () => {
  //   const theseTags = await fetch("/api/tags")
  //   console.log(theseTags)
  //   if (theseTags) {
  //     tagList = Object.values(theseTags.Tags)
  //   } else {
  //     tagList = ["clothing", "toys", "halloween", "food"]
  //   }
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name,
      description,
      price,
      category_id: Number(category)
    }
    const newProduct = await dispatch(fetchCreateProduct(payload));
    await dispatch(fetchAddImageToProduct(newProduct.id, previewImage, true));
    await dispatch(fetchAddImageToProduct(newProduct.id, otherImage1, false));
    await dispatch(fetchAddImageToProduct(newProduct.id, otherImage2, false));
    await dispatch(fetchAddImageToProduct(newProduct.id, otherImage3, false));
    await dispatch(fetchAddImageToProduct(newProduct.id, otherImage4, false));
    if(newProduct) {
      dispatch(fetchProductDetail(newProduct.id))
      history.push(`/products/${newProduct.id}`)
    }
  }

  // const handleTagClick = async (e) => {
  //   if (tags.includes(e.target.value)) {
  //     let thisTag, otherTags;
  //     thisTag = e.target.value;
  //     [thisTag, ...otherTags] = tags;
  //     setTags([...otherTags]);
  //   }
  //   else {
  //     setTags([...tags, e.target.value])
  //   }
  //   console.log("tags:", tags)
  // }

  return (
    <div className="n-product-form-wrapper">
      <h1>Create A Listing</h1>
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
          >
          </textarea>
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
        <label>Add Images</label>
        <input value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} placeholder="Preview Image URL"></input>
        <div>
        <input value={otherImage1} onChange={(e) => setOtherImage1(e.target.value)} placeholder="(optional)"></input>
        <input value={otherImage2} onChange={(e) => setOtherImage2(e.target.value)} placeholder="(optional)"></input>
        <input value={otherImage3} onChange={(e) => setOtherImage3(e.target.value)}  placeholder="(optional)"></input>
        <input value={otherImage4} onChange={(e) => setOtherImage4(e.target.value)}  placeholder="(optional)"></input>
        </div>
        {/* <label>
          Tags
          <input />
          <ul>
            {tagList.map((tag, idx) => <li key={idx} value={tag} onClick={handleTagClick}>{tag}</li>)}
          </ul>
        </label> */}
        <button type="submit">Create Listing</button>
      </form>
    </div>
  )
}

export default ProductFormPage;
