import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './ProductForm.css'
import { fetchCreateProduct, fetchAddImageToProduct, fetchProductDetail, CreateProductTag } from "../../../store/product";
import catto from '../../images/catto.svg'


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
  const [imgErrs, setImgErrs] = useState([])
  const [imgErrs1, setImgErrs1] = useState([])
  const [imgErrs2, setImgErrs2] = useState([])
  const [imgErrs3, setImgErrs3] = useState([])
  const [imgErrs4, setImgErrs4] = useState([])

  useEffect(async () => {
    const response = await fetch("/api/tags")
    if (response.ok) {
      const theseTags = await response.json()
      setTagList(Object.values(theseTags.Tags))
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
      const previewImg=await dispatch(fetchAddImageToProduct(newProduct.id, previewImage, true));
      const otherImg1=await dispatch(fetchAddImageToProduct(newProduct.id, otherImage1, false));
      const otherImg2=await dispatch(fetchAddImageToProduct(newProduct.id, otherImage2, false));
      const otherImg3=await dispatch(fetchAddImageToProduct(newProduct.id, otherImage3, false));
      const otherImg4=await dispatch(fetchAddImageToProduct(newProduct.id, otherImage4, false));
      if (previewImg?.errors){
        setImgErrs(previewImg?.errors)
        return
      }else{
        setImgErrs([])
      }
      if (otherImg1?.errors){
        setImgErrs1(otherImg1?.errors)
        return
      } else {
        setImgErrs1([])
      }
      if (otherImg2?.errors){
        setImgErrs2(otherImg2?.errors)
        return
      } else {
        setImgErrs2([])
      }
      if (otherImg3?.errors){
        setImgErrs3(otherImg3?.errors)
        return
      } else {
        setImgErrs3([])
      }
      if (otherImg4?.errors){
        setImgErrs4(otherImg4?.errors)
        return
      } else {
        setImgErrs4([])
      }
      await fetch(`/api/products/${newProduct.id}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: productTagList }),
      })
      dispatch(fetchProductDetail(newProduct.id))
      history.push(`/products/${newProduct.id}`)
    }
  }


  const handleTagClick = async (e) => {
    if (e.target.className === "tag-untoggled") {
      if (!(productTagList.length >= 5)) {
        e.target.className = "tag-toggled"
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
    const captalizedTag = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    setDisplayCustomTag(captalizedTag)
  }


  const handleAddClick = async (e) => {
    e.preventDefault()
    const tagListItems = []
    for (const tagObj of tagList) {
      tagListItems.push(Object.values(tagObj)[1])
    }

    if (tagListItems.includes(displayCustomTag)) {
      alert("The tag already exists. Please select it from the list.")
    } else {
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

      if (displayCustomTag.trim().length > 0 && displayCustomTag.length <= 25) {
        const newLi = <li className="tag-untoggled" id={res.id} key={lis.length} onClick={handleTagClick}>{displayCustomTag}</li>

        setLis([newLi])
        setTagList(prevTagList => [...prevTagList, res])
        setCustomTagInput("")
        setAddTagBtn("show")

      } else {
        alert("Tags cannot be empty and must be less than or equal to 25 characters")
      }
    }
  }



  // pressing enter to submit custom tag
  const handleCustomTagOnKeyPress = async (e) => {
    if (e.key === 'Enter') {
      handleAddClick(e)
    }
  }

  // const handleTagClick = async (e) => {
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
  //     setTags([...tags, e.target.textContent])
  //   }
  // }

  return (
    <div className="n-product-form-wrapper">
      <h1>Create A Listing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <h2 className='form-header'>What are you selling?</h2>
          <p className="form-subheader">Give your listing a creative name for all (animals included) to see!</p>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors && errors.name && <p id='error-msg'>*{errors.name}</p>}
        <label className="catto-container">
        <h2 className='form-header'>Care to share the details?</h2>
        <p className="form-subheader">Describe what makes your product special to fellow customers:</p>
        <img className="catto" src={catto}></img>
          <textarea
            autoComplete="off"
            placeholder="Please write at least 20 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          >
          </textarea>
          {errors && errors.description && <p id='error-msg'>{errors.description}</p>}
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
        <label>
          <h2 className='form-header'>Can we see it?</h2>
          <p className="form-subheader">Add some photos to liven up your listing and show a lucky pet what they could be getting.</p>
          </label>
        <div className="form-imagescontainer">
        <input value={previewImage} required type='url' onChange={(e) => setPreviewImage(e.target.value)} placeholder="Preview Image URL"></input>
          {imgErrs && imgErrs.image_url && <p id='error-msg'>*{imgErrs.image_url}</p>}
        <div className="other-images">
          <input value={otherImage1} onChange={(e) => setOtherImage1(e.target.value)} placeholder="(optional)"></input>
            {imgErrs1 && imgErrs1.image_url && <p id='error-msg'>*{imgErrs1.image_url}</p>}
          <input value={otherImage2} onChange={(e) => setOtherImage2(e.target.value)} placeholder="(optional)"></input>
            {imgErrs2 && imgErrs2.image_url && <p id='error-msg'>*{imgErrs2.image_url}</p>}
          <input value={otherImage3} onChange={(e) => setOtherImage3(e.target.value)} placeholder="(optional)"></input>
            {imgErrs3 && imgErrs3.image_url && <p id='error-msg'>*{imgErrs3.image_url}</p>}
          <input value={otherImage4} onChange={(e) => setOtherImage4(e.target.value)} placeholder="(optional)"></input>
            {imgErrs4 && imgErrs4.image_url && <p id='error-msg'>*{imgErrs4.image_url}</p>}
          </div>
        </div>
        <label className="tag-container">
          <h2 className='form-header'>Got tags?</h2>
          <p className="form-subheader formdescription-tags">Add or create some descriptive keywords to help customers find your product! </p>
          <ul className="n-tag-wrapper">
            {tagList.map((tag, idx) => <li key={idx} id={tag.id} onClick={handleTagClick} className={"tag-untoggled"}>{tag.name}</li>)}
            {/* {lis} */}
            {/* <form onSubmit={handleCustomTagOnSubmit}> */}
            {/* </form> */}
            <li className={`tag-add ${addTagBtn}`} onClick={handleClickAddTagBtn}>+</li>
            </ul>
            {addTagBtn === "hidden" && <div id="custom-tag-wrapper">
              <input
                type="text"
                id="custom-tag-div"
                className={customTagInputClass}
                value={customTagInput}
                onChange={handleAddCustomTag}
                onKeyPress={handleCustomTagOnKeyPress}
              />
              <li className={`add-tag-btn ${customTagInputClass}`} onClick={handleAddClick}>Add Tag</li>
            </div>}
        </label>
        <button className="button-form" type="submit">Create Listing!</button>
      </form>
    </div>
  )
}

export default ProductFormPage;
