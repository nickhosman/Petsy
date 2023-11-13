import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCheckoutCart, thunkLoadCart } from "../../../store/cart";
import './CartCheckout.css'
import CartCheckoutProduct from "../CartCheckoutProduct";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function CartCheckout() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

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
  };

  async function handleCheckout() {
    try {
      await dispatch(thunkCheckoutCart(cart.id, user.id))
      setModalOpen(true)
    } catch (error) {
      console.error(error)
    }
  };

  async function handleNavigate() {
    history.push('/')
    await dispatch(thunkLoadCart())
    setModalOpen(false)
  }

  return(
      <div id='cartcheckout-container'>
      <h4 className="cartcheckout-username">{user.firstName}'s Shopping Cart</h4>
      <p className="cartcheckout-manageheader">Manage all the products in your cart ({cart.products.length})</p>
      {cart && cart.products.length ?
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
            <p className="cartcheckout-label cartcheckout-totaldue">Total Due</p>
            <p className="cartcheckout-totaldue">${((calculateTotal() + calculateTax()) + 9.65).toFixed(2)}</p>
          </div>
          <div className="cart-checkout-buttoncont">
          <button className="petsy-button cart-checkout-button" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
        <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="order-modal">
          <h2 id="modal-modal-title">
            Order Confirmed
          </h2>
          <p id="modal-modal-description">
            An email has been sent to {user.email}.
          </p>
          <p id="modal-modal-description">
            Thanks for shopping with us!
          </p>
          <Button
            sx={{
              marginTop: '1vh',
              backgroundColor: 'white',
              color: 'rgb(189, 22, 22)',
              '&:hover': {
                textDecoration: 'underline',
                backgroundColor: 'white'
              }
            }}
            onClick={handleNavigate}> Return Home </Button>
        </Box>
      </Modal>
      </div>
        :
        <div className="noproducts-cart">
        <p>Your cart currently has no products</p>
      </div>
      }
    </div>
  )
};

export default CartCheckout
