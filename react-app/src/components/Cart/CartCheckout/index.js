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

  return(
    <div id='cartcheckout-container'>
      <h4 className="cartcheckout-username">{user.firstName}'s Shopping Cart</h4>
      <p className="cartcheckout-manageheader">Manage all the products in your cart ({cart.products.length})</p>

      <div className="cartcheckout-cartcontainer">
        <div>
        {cart.products.map(product => (
          <CartCheckoutProduct product={product}/>))}
        </div>
        <div className="cartcheckout-paymentcontainer">
          <div>
            <p>Item(s) total</p>
          </div>
          <div>
            <p>Shop discount</p>
          </div>
          <div>
            <p>Subtotal</p>
          </div>
          <div>
            <p>Shipping</p>
          </div>
          <div>
            <p>Total</p>
          </div>
        </div>
      </div>
    </div>

  )
};

export default CartCheckout
