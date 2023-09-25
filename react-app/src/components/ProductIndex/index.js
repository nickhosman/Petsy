import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../store/product";

function ProductIndex() {
  const dispatch = useDispatch();
  const objProducts = useSelector((state) => state.products.Products);
  console.log(objProducts)
  const allProducts = Object.values(objProducts);

  useEffect(() => {
    dispatch(thunkLoadProducts())
  }, [dispatch])

  return (
    <div>
      {allProducts.map((product) => (
        <h2>{product.name}</h2>
      ))}
    </div>
  )
}

export default ProductIndex
