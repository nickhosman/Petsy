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
  const [tagList, setTagList] = useState([]);


  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(async () => {
    const response = await fetch("/api/tags")
    if (response.ok) {
      const theseTags = await response.json()
      // console.log("TAGS BEFORE:", theseTags)
      setTagList(Object.values(theseTags.Tags))
      // console.log("TAGS:", tagList)
    }
  }, [])

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

  const handleTagClick = async (e) => {
    console.log("FIRST", tags)
    if (e.target.className === "tag-untoggled") {
      e.target.className = "tag-toggled"
    } else {
      e.target.className = "tag-untoggled"
    }
    if (tags.includes(e.target.textContent)) {
      let valIdx = tags.indexOf(e.target.textContent)
      let newTags = [...tags]
      newTags.splice(valIdx, 1)
      setTags(newTags)
    } else {
      console.log("AAAAAAAAAAAAAAAAAAAA")
      setTags([...tags, e.target.textContent])
    }
    console.log("tags:", tags)
  }

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
        <label className="tag-container">
          Tags
          <ul className="n-tag-wrapper">
            {tagList.map((tag, idx) => <li key={idx} value={tag.name} onClick={handleTagClick} className={"tag-untoggled"}>{tag.name}</li>)}
            <li className="tag-add">+</li>
          </ul>
        </label>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  )
}

export default ProductFormPage;
