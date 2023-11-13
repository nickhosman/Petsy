import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCart } from "../../../store/cart";
import './CartCheckout.css'
import CartCheckoutProduct from "../CartCheckoutProduct";

function CartCheckout() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkLoadCart())
  }, [dispatch]);

  if(!cart || !cart.products) return null

  function calculateTotal() {
    let total = 0;
    cart.products.map(product => {
        total += (product.price * product.quantity)
    })
    return total
  };

  function calculateTax() {
    const total = calculateTotal();
    return (total * 0.0725);
  }

  return(
    <div id='cartcheckout-container'>
      <h4 className="cartcheckout-username">{user.firstName}'s Shopping Cart</h4>
      <p className="cartcheckout-manageheader">Manage all the products in your cart ({cart.products.length})</p>

      <div className="cartcheckout-cartcontainer">
        <div>
        {cart.products.map(product => (
          <CartCheckoutProduct product={product} user={user}/>))}
        </div>
        <div className="cartcheckout-paymentcontainer">
          <div className="cartcheckout-oneprice toponeprice">
            <p className="cartcheckout-label">Item(s) total</p>
            <p>${calculateTotal().toFixed(2)}</p>
          </div>
          <div className="cartcheckout-oneprice">
            <p className="cartcheckout-label">Tax</p>
            <p>${calculateTax().toFixed(2)}</p>
          </div>
          <div className="cartcheckout-oneprice">
            <p className="cartcheckout-label">Subtotal</p>
            <p>${(calculateTotal() + calculateTax()).toFixed(2)}</p>
          </div>
          <div className="cartcheckout-oneprice">
            <p className="cartcheckout-label">Shipping + Fees</p>
            <p>$9.65</p>
          </div>
          <div className="cartcheckout-oneprice">
            <p className="cartcheckout-label">Total</p>
            <p>${((calculateTotal() + calculateTax()) + 9.65).toFixed(2)}</p>
          </div>
          <div className="cart-checkout-buttoncont">
          <button className="petsy-button cart-checkout-button">Checkout</button>
          </div>
        </div>
      </div>
    </div>

  )
};

export default CartCheckout
