import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect} from "react-router-dom";
import './ProductForm.css'

function ProductFormPage() {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState([]);
  let tagList = ["clothing", "toys", "halloween", "food"]

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
    alert("Feature in production")
  }

  const handleTagClick = async (e) => {
    if (tags.includes(e.target.value)) {
      let thisTag, otherTags;
      thisTag = e.target.value;
      [thisTag, ...otherTags] = tags;
      setTags([...otherTags]);
    }
    else {
      setTags([...tags, e.target.value])
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
            onChange={(e) => setPrice(e.target.price)}
            required
          />
        </label>
        <label>
          Product Category
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Aquatic">Aquatic</option>
            <option value="Reptile">Reptile</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <label>
          Tags
          <ul>
            {tagList.map((tag, idx) => <li key={idx} value={tag} onClick={handleTagClick}>{tag}</li>)}
          </ul>
        </label>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  )
}

export default ProductFormPage;
