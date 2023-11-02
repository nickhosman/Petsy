import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../store/product";
import ProductCard from "../ProductCard";
import './ProductIndex.css'
import Loader from "../../Loader";

function ProductIndex() {
  const dispatch = useDispatch();
  const objProducts = useSelector((state) => state.products.Products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        await dispatch(fetchAllProducts())
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
    }
  }
    fetchData();
  }, [dispatch])

  if (!objProducts || Object.keys(objProducts).length === 0) return null;
  const allProducts = Object.values(objProducts);

  if (loading) return <Loader />;
  return (
    <div id="all-products-div">
      <div id="all-products-title">
        <h1>PRODUCTS</h1>
      </div>
      <div className="k-productindex-container">
      {allProducts.map((product) => (
         <ProductCard product={product}/>
       ))}
    </div>
    </div>

  )
}

export default ProductIndex
