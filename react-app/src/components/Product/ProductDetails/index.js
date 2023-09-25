import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../../../store/product';

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.singleProduct)
  console.log('XXXXXXXXXXXXXXXXXXXXX')

  useEffect(() => {
    dispatch(fetchProductDetail(productId))
  }, [dispatch]);

  if(!product || Object.keys(product).length === 0) return null;

  return(
    <>
      {product.name}
    </>
  )
}

export default ProductDetails
