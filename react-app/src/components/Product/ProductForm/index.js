import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './ProductForm.css'
import { fetchCreateProduct, fetchAddImageToProduct, fetchProductDetail, CreateProductTag } from "../../../store/product";

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
  const [productTagList, setProductTagList] = useState([]);
  const [productTag, setProductTag] = useState("");
  const [customTagInput, setCustomTagInput]=useState("")
  const [addTagBtn, setAddTagBtn] = useState("show")
  const [customTagInputClass, setCustomTagInputClass]=useState("hidden")
  const [displayCustomTag, setDisplayCustomTag]=useState("")
  const [lis, setLis] = useState([]);

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
    if(newProduct.errors) {
      setErrors(newProduct.errors)
    };


    if (newProduct && !newProduct.errors) {
      await dispatch(fetchAddImageToProduct(newProduct.id, previewImage, true));
      await dispatch(fetchAddImageToProduct(newProduct.id, otherImage1, false));
      await dispatch(fetchAddImageToProduct(newProduct.id, otherImage2, false));
      await dispatch(fetchAddImageToProduct(newProduct.id, otherImage3, false));
      await dispatch(fetchAddImageToProduct(newProduct.id, otherImage4, false));
      // console.log(newProduct.id)
      await fetch(`/api/products/${newProduct.id}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: productTagList }),
      })
      console.log(productTagList)
      dispatch(fetchProductDetail(newProduct.id))
      history.push(`/products/${newProduct.id}`)
    }
  }


  const handleTagClick = async (e) => {
    if (e.target.className === "tag-untoggled") {
      if (!(productTagList.length >= 5)) {
        e.target.className = "tag-toggled"
        console.log(e.target.id)
        setProductTagList([...productTagList, e.target.id])
      }
    } else {
      e.target.className = "tag-untoggled"
      let tempList = [...productTagList]
      let tagIdx = tempList.indexOf(e.target.id)
      tempList.splice(tagIdx, 1)
      setProductTagList(tempList)
    }

  }
  // + button onClick
  const handleClickAddTagBtn = e=>{
    e.preventDefault()
    setCustomTagInputClass("show")
    setAddTagBtn("hidden")
  }
  // input onChange
  const handleAddCustomTag = e => {
    e.preventDefault()
    const input = e.target.value
    setCustomTagInput(input)
    setDisplayCustomTag(e.target.value)

  }

  const handleAddClick = async (e) => {
    e.preventDefault()
    const tagListItems= []
    for(const tagObj of tagList){
      tagListItems.push(Object.values(tagObj)[1])
      setTagList(tagList)
    }
    console.log(customTagInput)
    if (tagListItems.includes(customTagInput)){
      alert("The tag already exists. Please select it from the list.")
    }
      const newTag = await fetch("/api/tags/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayCustomTag
        })
      })
      const res = await newTag.json()
      if (displayCustomTag.length <= 25) {
        const newLi = <li className="tag-untoggled" id={res.id} key={lis.length} onClick={handleTagClick}>{displayCustomTag}</li>
        setLis([...lis, newLi])
        setCustomTagInput("")
      } else {
          alert("Tags must be less than or equal to 25 characters")
      }
  }

  // pressing enter to submit custom tag
  const handleCustomTagOnKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const newTag = await fetch("/api/tags/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayCustomTag
        })
      })
      const res = await newTag.json()
      if (!res.errors && displayCustomTag.length <= 25) {
        const newLi = <li className="tag-untoggled" id={res.id} key={lis.length} onClick={handleTagClick}>{displayCustomTag}</li>
        setLis([...lis, newLi])
        setCustomTagInput("")
      } else {
        alert("Tags must be less than or equal to 25 characters")
      }
      // console.log(res)
    }
  }

  // const handleTagClick = async (e) => {
  //   console.log("FIRST", tags)
  //   if (e.target.className === "tag-untoggled") {
  //     e.target.className = "tag-toggled"
  //   } else {
  //     e.target.className = "tag-untoggled"
  //   }
  //   if (tags.includes(e.target.textContent)) {
  //     let valIdx = tags.indexOf(e.target.textContent)
  //     let newTags = [...tags]
  //     newTags.splice(valIdx, 1)
  //     setTags(newTags)
  //   } else {
  //     console.log("AAAAAAAAAAAAAAAAAAAA")
  //     setTags([...tags, e.target.textContent])
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
        {errors && errors.name && <p id='error-msg'>*{errors.name}</p>}
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
          {errors && errors.description && <p id='error-msg'>*{errors.description}</p>}
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
        {errors && errors.price && <p id='error-msg'>{errors.price}</p>}
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
        <div className="form-imagescontainer">
        <input value={previewImage} required type='url' onChange={(e) => setPreviewImage(e.target.value)} placeholder="Preview Image URL"></input>
        <div className="other-images">
          <input value={otherImage1} onChange={(e) => setOtherImage1(e.target.value)} placeholder="(optional)"></input>
          <input value={otherImage2} onChange={(e) => setOtherImage2(e.target.value)} placeholder="(optional)"></input>
          <input value={otherImage3} onChange={(e) => setOtherImage3(e.target.value)} placeholder="(optional)"></input>
          <input value={otherImage4} onChange={(e) => setOtherImage4(e.target.value)} placeholder="(optional)"></input>
        </div>
        </div>
        <label className="tag-container">
          Tags
          <ul className="n-tag-wrapper">
            {tagList.map((tag, idx) => <li key={idx} id={tag.id} onClick={handleTagClick} className={"tag-untoggled"}>{tag.name}</li>)}
            {lis}
            {/* <form onSubmit={handleCustomTagOnSubmit}> */}
            {/* </form> */}
            <li className={`tag-add ${addTagBtn}`} onClick={handleClickAddTagBtn}>+</li>
            </ul>
            <div id="custom-tag-wrapper">
              <input
                type="text"
                id="custom-tag-div"
                className={customTagInputClass}
                value={customTagInput}
                onChange={handleAddCustomTag}
                onKeyPress={handleCustomTagOnKeyPress}
              />
              <li className={`add-tag-btn ${customTagInputClass}`} onClick={handleAddClick}>Add Tag</li>
            </div>
        </label>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  )
}

export default ProductFormPage;
