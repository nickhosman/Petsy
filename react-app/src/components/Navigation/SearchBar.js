import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { fetchAllProducts } from '../../store/product';

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  // GET ALL PRODUCTS
  const productObj = useSelector((state) => state.products.Products && Object.values(state.products.Products).length ? state.products.Products : {});
  const allProducts = Object.values(productObj)
  // GET ALL CATEGORIES
  const allCategories = useSelector(state => state.categories.Categories && Object.values(state.categories.Categories).length ? state.categories.Categories : {})
  const categoryArr = Object.values(allCategories)

  const [searchInput, setSearchInput] = useState('')

  const handleInputChange = e => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  // navigate to /products/search on submit search
  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push(`/products/search`)
  }

  // filtered product payload
  const filteredProductIdArr = []
  if (searchInput.length) {
    // filter by product name
    allProducts.forEach(product => {
      if (product.name.includes(searchInput) && !filteredProductIdArr.includes(product.id)) {
        console.log(product)
        filteredProductIdArr.push(product.id)
      }
      // filter by category
      categoryArr.forEach(categoryObj => {
        if (categoryObj.name.includes(searchInput)) {
          const id = categoryObj.id
          allProducts.forEach(product => {
            if (product.categoryId === id) {
              filteredProductIdArr.push(product.name)

            }
          })

        }
      })
      // filter by tags - to do

    })
  }
  console.log(filteredProductIdArr)
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  return (
    <div id="search-bar-div">
      <form onSubmit={handleSubmit}>
        <input id="search-bar-input"
          type="text"
          placeholder='Search for something...'
          value={searchInput}
          onChange={handleInputChange}
        />
      </form>

    </div>
  )
}

export default SearchBar