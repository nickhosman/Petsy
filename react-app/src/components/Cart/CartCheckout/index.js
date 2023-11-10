import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCart } from "../../../store/cart";

function CartCheckout() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(thunkLoadCart())
  }, [dispatch]);

  console.log('xxxxx', cart)
  return(
    <p>Hello!</p>
  )
};

export default CartCheckout
