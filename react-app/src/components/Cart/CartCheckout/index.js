import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCart } from "../../../store/cart";
import './CartCheckout.css'

function CartCheckout() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkLoadCart())
  }, [dispatch]);

  if(!cart || !cart.products) return null

  return(
    <div id='cartcheckout-container'>
      <h4 className="cartcheckout-username">{user.firstName}'s Shopping Cart</h4>
      <p className="cartcheckout-manageheader">Manage all the products in your cart ({cart.products.length})</p>

      <div className="cartcheckout-cartcontainer">
        {cart.products.map(product => (
          <div>
            <div>
            <p>{product.seller}</p>
            <img className="cartcheckout-image" src={product.image} alt=''/>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
};

export default CartCheckout
