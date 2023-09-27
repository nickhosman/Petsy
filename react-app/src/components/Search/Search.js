import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedProducts } from "../../store/product";
import ProductCard from "../Product/ProductCard";
import { useLocation  } from 'react-router-dom'

import '../Product/ProductIndex/ProductIndex.css'

function Search({ searchInput,setSearchInput }) {
  const location = useLocation();
  const queryTerm = new URLSearchParams(location.search).get('q');
  console.log(queryTerm)
  const dispatch = useDispatch();
  const objProducts = useSelector((state) => state.products?.searchProducts?.Search);

  console.log(objProducts)
  useEffect(() => {
    setSearchInput(queryTerm)
    dispatch(fetchSearchedProducts(searchInput))
  }, [dispatch, searchInput])

  if (!objProducts || Object.keys(objProducts).length === 0) return null;
  const searchProducts = Object.values(objProducts);
  console.log(searchProducts)

  return (
    <div id="all-products-div">
      <div id="all-products-title">
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
