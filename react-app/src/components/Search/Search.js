import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedProducts } from "../../store/product";
import ProductCard from "../Product/ProductCard";
import { useLocation  } from 'react-router-dom'


function Search({ searchInput,setSearchInput }) {
  const location = useLocation();
  const queryTerm = new URLSearchParams(location.search).get('q');
  console.log(queryTerm)
  const dispatch = useDispatch();
  const objProducts = useSelector((state) => state.products.Search);

  console.log(objProducts)
  useEffect(() => {
    setSearchInput(queryTerm)
    dispatch(fetchSearchedProducts(searchInput))
  }, [dispatch, searchInput])

  if (!objProducts || Object.keys(objProducts).length === 0) return null;
  const searchProducts = Object.values(objProducts);

  return (
    <div id="search-products-div">
      <div id="search-products-title">
        <h1>PRODUCTS</h1>
      </div>
      <div className="k-productindex-container">
        {searchProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>

  )
}

export default Search
