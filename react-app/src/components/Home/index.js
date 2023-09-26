import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './home.css'
import { fetchAllCategories } from '../../store/category';
import { fetchAllProducts } from '../../store/product';



const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isNavigated, setIsNavigated] = useState(false)
  const [filterCategoryId, setFilterCategoryId] = useState(null)

  // GET ALL CATEGORIES
  const allCategories = useSelector(state => state.categories.Categories && Object.values(state.categories.Categories).length ? state.categories.Categories : {})

  const productObj = useSelector((state) => state.products.Products && Object.values(state.products.Products).length ? state.products.Products : {});

  const allProducts = Object.values(productObj)
  const categoryArr = Object.values(allCategories)
  console.log(categoryArr)


  console.log(productObj)

  const handleGoToCategory = e => {
    e.preventDefault()
    if (!isNavigated) {
      let targetDiv = e.target
      while (targetDiv) {
        if (targetDiv.className === "category-card" && targetDiv.id) {

          // setItemCategoryId()
          history.push(`/products?category=${targetDiv.id}`)
          setIsNavigated(true)
          break
        }
        targetDiv = targetDiv.parentElement
      }
      const name = targetDiv.id
      let filterId
      categoryArr.forEach(categoryObj => {
        if (categoryObj.name === name) {
          filterId = categoryObj.id
          return
        }
      })
      console.log(filterId)
      if (filterId){
        setFilterCategoryId(filterId)
      }
    }
    console.log(allProducts[0].categoryId)
    console.log(filterCategoryId)

  }
  useEffect(() => {
    const filteredItems = allProducts.filter(product => product.categoryId === filterCategoryId)
    console.log(filteredItems)
  }, [filterCategoryId, allProducts])
  useEffect(() => {
    dispatch(fetchAllCategories())
    dispatch(fetchAllProducts())
  }, [dispatch])

  if (!Object.values(allCategories).length) {
    return null
  }
  return (
    <div>
      <div id="tag-div">
        <div id="tag-text">
          <h3>The Halloween Shop</h3>
          <h3>Pet Clothing</h3>
          <h3>Toys</h3>
          <h3>Treats</h3>
        </div>
      </div>
      <div id="category-div" >
        <div className="category-card" id="Dog" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-dog-img" src="https://t4.ftcdn.net/jpg/03/20/31/23/240_F_320312301_P50xX4vn41JdsueONpzzWJy6ezFSp8d4.jpg" alt="Picture_of_Dog" />
          </div>
          <p>For Dogs</p>
        </div>
        <div className="category-card" id="Cat" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-cat-img" src="https://as1.ftcdn.net/v2/jpg/02/94/95/06/1000_F_294950610_0uQYP5eWysiojsEjRgHybXy41AJ7EqU4.jpg" alt="Picture_of_Cat" />
          </div>
          <p>For Cats</p>
        </div>

        <div className="category-card" id="Reptile" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-reptile-img" src="	https://t4.ftcdn.net/jpg/02/84/36/01/240_F_284360115_HVFpofdPf08t3DPFDnziiXYL8su7uTg1.jpg" alt="Picture_of_Reptile" />
          </div>
          <p>For Reptiles</p>
        </div>
        <div className="category-card" id="Aquatic" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-aquatic-img" src="https://t3.ftcdn.net/jpg/06/17/10/92/240_F_617109219_Ct1DD5JDXvpF0mn2Gv1bcttQhCasWLrM.jpg" alt="Picture_of_Aquatic" />
          </div>
          <p>For Aquatic</p>
        </div>
        <div className="category-card" id="Others" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-guineapig-img" src="https://t3.ftcdn.net/jpg/06/11/28/02/360_F_611280278_F4va8Lxym7oPkVAzenVbCnvw2DsFrVA5.jpg" alt="Picture_of_Guinea_Pig" />
          </div>
          <p>Others</p>
        </div>
      </div>
      <div id="shop-selections-div">
        <h2>Shop Our Selections</h2>
      </div>
    </div>
  )
}

export default Home