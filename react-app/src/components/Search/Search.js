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

  console.log('XXXXX', objProducts)
  useEffect(() => {
    // setSearchInput(queryTerm)
    dispatch(fetchSearchedProducts(queryTerm))
  }, [dispatch, queryTerm])

  let found = true;
  if (!objProducts || Object.keys(objProducts).length === 0) found = false

  return (
    <div id="all-products-div">
      <div id="all-products-title">
        <h1>Search Result</h1>
      </div>
      {!found ?
      <div>
        <h2 style={{ color: 'rgb(212, 25, 25)' }}>No products found</h2>
      </div> :
      <div className="k-productindex-container">
        {Object?.values(objProducts).map((product) => (
          <ProductCard product={product} />
        ))}
      </div>}
    </div>
  )
}

export default Search
