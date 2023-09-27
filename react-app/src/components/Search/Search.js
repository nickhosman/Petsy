import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedProducts } from "../../store/product";
import ProductCard from "../Product/ProductCard";
import { useLocation  } from 'react-router-dom'

import { useSearchContext } from "../../context/Search";
import '../Product/ProductIndex/ProductIndex.css'


function Search() {
  const dispatch = useDispatch();
 
  // const { searchInput, setSearchInput } = useSearchContext()

  const location = useLocation();
  const queryTerm = new URLSearchParams(location.search).get('q');

  
  const objProducts = useSelector((state) => state.products?.searchProducts?.Search);

  console.log(objProducts)
  useEffect(() => {
    // setSearchInput(queryTerm)
    dispatch(fetchSearchedProducts(queryTerm))
  }, [dispatch, queryTerm])

  if (!objProducts || Object.keys(objProducts).length === 0) return null;
  const searchProducts = Object.values(objProducts);
  console.log(searchProducts)

  return (
    <div id="all-products-div">
      <div id="all-products-title">
        <h1>PRODUCTS</h1>
      </div>
      <div className="">
        {searchProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>

  )
}

export default Search
