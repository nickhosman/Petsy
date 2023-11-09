import React from "react";
import './CartProduct.css'

function CartProduct({product}) {
  return(
    <div id='cartproduct-container'>
      <img id='cartproduct-img' src={product.image} alt=''/>
      <div id='cartproduct-details'>
        <p>{product.name}</p>
        <p>Quantity: {product.quantity}</p>
      </div>
      <div id='cartproduct-price'>
        <p>${(product.price * product.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
};

export default CartProduct;
