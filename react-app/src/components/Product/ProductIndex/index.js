import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../../store/product";

function ProductIndex() {
  const dispatch = useDispatch();
  const objProducts = useSelector((state) => state.products.Products);

  useEffect(() => {
    dispatch(thunkLoadProducts())
  }, [dispatch])

  if (!objProducts || Object.keys(objProducts).length === 0) return null;
  const allProducts = Object.values(objProducts);

  return (
    <div>
      {allProducts.map((product) => (
         <ProductCard product={product}/>
       ))}
    </div>
  )
}

export default ProductIndex
