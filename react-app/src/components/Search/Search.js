import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedProducts } from "../../store/product";
import ProductCard from "../Product/ProductCard";


function Search({ searchInput }) {
  const dispatch = useDispatch();
  const objProducts = useSelector((state) => {
    console.log(state)
    // state.products.searchProducts
  }
    );

  console.log(objProducts)
  useEffect(() => {
    dispatch(fetchSearchedProducts(searchInput))
  }, [dispatch])

  if (!objProducts || Object.keys(objProducts).length === 0) return null;
  const searchProducts = Object.values(objProducts);

  return (
    <div id="search-products-div">
      <div id="search-products-title">
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
