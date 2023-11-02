import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedProducts } from "../../store/product";
import ProductCard from "../Product/ProductCard";
import { useLocation  } from 'react-router-dom'
import '../Product/ProductIndex/ProductIndex.css'
import Loader from "../Loader";

function Search() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // const { searchInput, setSearchInput } = useSearchContext()

  const location = useLocation();
  const queryTerm = new URLSearchParams(location.search).get('q');

  const objProducts = useSelector((state) => state.products?.searchProducts?.Search);

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        await dispatch(fetchSearchedProducts(queryTerm))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    // setSearchInput(queryTerm)
    fetchData();
  }, [dispatch, queryTerm])



  let found = true;
  if (!objProducts || Object.keys(objProducts).length === 0) found = false

  if(loading) return <Loader />
  return (
    <div id="all-products-div">
      <div className="all-products-title">
        <h1 className="title-header">Search Result: {queryTerm}</h1>
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
