import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './home.css'
import { fetchAllCategories } from '../../store/category';
import { fetchAllProducts } from '../../store/product';
import ProductsSelection from './ProductsSelection/ProductsSelection';
import Trending from './Trending/Trending';
import { useSearchContext } from '../../context/Search';



const Home = ({ searchInput, setSearchInput }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isNavigated, setIsNavigated] = useState(false)
  const [filterCategoryId, setFilterCategoryId] = useState(null)
  const sessionUser = useSelector(state => state.session.user);


  // GET ALL CATEGORIES
  const allCategories = useSelector(state => state.categories.Categories && Object.values(state.categories.Categories).length ? state.categories.Categories : {})

  const productObj = useSelector((state) => state.products.Products && Object.values(state.products.Products).length ? state.products.Products : {});

  const allProducts = Object.values(productObj)
  const categoryArr = Object.values(allCategories)

  const handleViewAllProducts =e=>{
    e.preventDefault()
    history.push(`/products`)
  }

  const handleGoToCategory = e => {
    e.preventDefault()
    if (!isNavigated) {
      let targetDiv = e.target
      while (targetDiv) {
        if (targetDiv.className === "category-card" && targetDiv.id) {

          setSearchInput(targetDiv.id)
          // setItemCategoryId()
          history.push(`/search?q=${targetDiv.id}`)
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
      if (filterId) {
        setFilterCategoryId(filterId)
      }
    }
  }

  // Our Selection Section
  const productsInSelection = [];
  for (let i = 0; i < 10; i++) {
    if (productsInSelection.length < 5) {
    const randomIdx = Math.floor(Math.random() * allProducts.length);

    const selectRandomProduct = allProducts[randomIdx];
    if (!productsInSelection.includes(selectRandomProduct)) {
      productsInSelection.push(selectRandomProduct);
    }
    }
  }
// Trending Section
  const productsInTrending = [];
  for (let i = 0; i < 20; i++) {
    if (productsInTrending.length<10){
      const randomIdx = Math.floor(Math.random() * allProducts.length);
      const selectRandomProduct = allProducts[randomIdx];
      if (!productsInTrending.includes(selectRandomProduct)) {
        productsInTrending.push(selectRandomProduct);
      }

    }

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
      {sessionUser && <p className='homepage-userwelcome'> <span>Welcome back,</span> <strong className='underline-name'>{sessionUser.firstName}</strong>!</p>}
      <div id="tag-div">
        <div id="tag-text">
          <p>|</p>
          <h3>The Halloween Shop</h3>
          <p>|</p>
          <h3>Pet Clothing</h3>
          <p>|</p>
          <h3>Toys</h3>
          <p>|</p>
          <h3>Treats</h3>
          <p>|</p>
        </div>
      </div>
      <div id="category-div" >
        <div className="category-card" id="Dog" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-dog-img" src="https://i.etsystatic.com/5632914/r/il/8ba30a/4272623729/il_794xN.4272623729_orkx.jpg" alt="Picture_of_Dog" />
          </div>
          <p>For Dogs</p>
        </div>
        <div className="category-card" id="Cat" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-cat-img" src="https://pbs.twimg.com/media/F6CzEK5WQAAOc8t?format=jpg" alt="Picture_of_Cat" />
          </div>
          <p>For Cats</p>
        </div>

        <div className="category-card" id="Reptile" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-reptile-img" src="https://i.etsystatic.com/17565181/r/il/96bc4d/3117994707/il_794xN.3117994707_v7vd.jpg" alt="Picture_of_Reptile" />
          </div>
          <p>For Reptiles</p>
        </div>
        <div className="category-card" id="Aquatic" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-aquatic-img" src="https://i.etsystatic.com/31903230/r/il/379794/3621076408/il_794xN.3621076408_jwkd.jpg" alt="Picture_of_Aquatic" />
          </div>
          <p>For Aquatic</p>
        </div>
        <div className="category-card" id="Others" onClick={handleGoToCategory}>
          <div className="category-img-card" >
            <img id="category-guineapig-img" src="https://i.etsystatic.com/27232651/r/il/5b7220/4621311834/il_794xN.4621311834_y1yw.jpg" alt="Picture_of_Guinea_Pig" />
          </div>
          <p>Others</p>
        </div>
        <div id="view-all-div" onClick={handleViewAllProducts}>
          <p>View All</p>
          <p><i class="fa-solid fa-arrow-right fa-sm"></i></p>
        </div>
      </div>
      <div id="shop-selections-div" >
        <h2>Shop Our Selections: </h2>
        <div id="our-selection-div">
          {productsInSelection.map(product => (
            <ProductsSelection product={product} />
          ))}
        </div>

      </div>
      <div id="trending-section">
        <h2>Trending</h2>
        <div id="trending-div">
          {productsInTrending.map(product => (
            <Trending product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
