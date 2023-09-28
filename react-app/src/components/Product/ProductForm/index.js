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
    }
    if(!previewImage) {
      setErrors({ ...errors, "preview": "Must have preview image"})
    }

    await dispatch(fetchAddImageToProduct(newProduct.id, previewImage, true));
    await dispatch(fetchAddImageToProduct(newProduct.id, otherImage1, false));
    await dispatch(fetchAddImageToProduct(newProduct.id, otherImage2, false));
    await dispatch(fetchAddImageToProduct(newProduct.id, otherImage3, false));
    await dispatch(fetchAddImageToProduct(newProduct.id, otherImage4, false));
    console.log(productTagList)
    let tagStr = ""
    productTagList.forEach(async tag => {
      tagStr += tag + ",,,"
    })
    const tagObj = {
      name: tagStr
    }
    if (newProduct) {
      // console.log(newProduct.id)
      await dispatch(CreateProductTag(newProduct.id,tagObj))
      dispatch(fetchProductDetail(newProduct.id))
      history.push(`/products/${newProduct.id}`)
    }
  }


  const handleTagClick = async (e) => {
    console.log("FIRST", tags)
    let selTag = e.target.textContent
    if (e.target.className === "tag-untoggled") {
      e.target.className = "tag-toggled"
      setProductTagList(prevTagList => {
        if (prevTagList?.length < 5) {
          if (!prevTagList.includes(selTag)) {
            console.log('selTag', selTag)
            console.log('newtags', [...prevTagList, selTag])
            return[...prevTagList,selTag]
          }
          return prevTagList
        } else {
          e.target.className = "tag-untoggled"
          return prevTagList
        }
        })
    } else {
        e.target.className = "tag-untoggled"
        setProductTagList(prevTagList => {
          const updatedTagList = prevTagList.filter(tag => tag !== selTag)
          console.log('UPDATE', updatedTagList)
          return updatedTagList
        })
      }
    }



  // + button onClick
  const handleClickAddTagBtn = e=>{
    e.preventDefault()
    setCustomTagInputClass("show")

  }
  // input onChange
  const handleAddCustomTag = e => {
    e.preventDefault()
    const input = e.target.value
    setCustomTagInput(input)
    setDisplayCustomTag(e.target.value)

  }

  // pressing enter to submit custom tag
  const handleCustomTagOnKeyPress =e=>{
    if (e.key === 'Enter') {
      e.preventDefault()

      const newLi = <li className="tag-untoggled" key={lis.length} onClick={handleTagClick}>{displayCustomTag}</li>
      setLis([...lis, newLi])
      setCustomTagInput("")

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

  console.log('ERRORS', errors)
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
        <input value={previewImage} required type='url' onChange={(e) => setPreviewImage(e.target.value)} placeholder="Preview Image URL"></input>
        <div>
          <input value={otherImage1} type='url' onChange={(e) => setOtherImage1(e.target.value)} placeholder="(optional)"></input>
          <input value={otherImage2} type='url' onChange={(e) => setOtherImage2(e.target.value)} placeholder="(optional)"></input>
          <input value={otherImage3} type='url' onChange={(e) => setOtherImage3(e.target.value)} placeholder="(optional)"></input>
          <input value={otherImage4} type='url' onChange={(e) => setOtherImage4(e.target.value)} placeholder="(optional)"></input>
        </div>
        <label className="tag-container">
          Tags
          <ul className="n-tag-wrapper">
            {tagList.map((tag, idx) => <li key={idx} value={tag.name} onClick={handleTagClick} className={"tag-untoggled"}>{tag.name}</li>)}
            {lis}
            {/* <form onSubmit={handleCustomTagOnSubmit}> */}
              <input
                type="text"
                id="custom-tag-div"
                className={customTagInputClass}
                value={customTagInput}
                onChange={handleAddCustomTag}
                onKeyPress={handleCustomTagOnKeyPress} />
            {/* </form> */}
            <li className="tag-add" onClick={handleClickAddTagBtn}>+</li>
          </ul>
        </label>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  )
}

export default ProductFormPage;
