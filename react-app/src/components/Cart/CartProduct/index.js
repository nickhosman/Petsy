import React, { useState } from "react";
import { thunkAddToCart, thunkRemoveFromCart, thunkLoadCart } from "../../../store/cart";
import './CartProduct.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";


function CartProduct({product}) {
  const [quantity, setQuantity] = useState(product.quantity);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  async function handleIncrement() {
      await dispatch(thunkAddToCart(user.id, product.id, 1))
      await dispatch(thunkLoadCart())
  }

  async function handleDecrement() {
    if(quantity > 1) {
      await dispatch(thunkRemoveFromCart(user.id, product.id, 1))
      await dispatch(thunkLoadCart())
    }
  }

  return(
    <div id='cartproduct-container'>
      <img id='cartproduct-img' src={product.image} alt=''/>
      <div id='cartproduct-details'>
        <p>{product.name}</p>
        <p>${product.price}</p>
        <Box>
          <button onClick={handleDecrement}  className="quantity-button qb-left" > - </button>
          <TextField
          value={product.quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputProps={{
            sx: {
              width: '38px',
              height: '31px',
              fontSize: '12px',
              textAlign: 'center',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(237, 237, 237)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(237, 237, 237)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(237, 237, 237)',
              },
            },
            readOnly: true
          }}
          inputProps={{ step: 1, min: 0, type: 'number', 'aria-labelledby': 'quantity-field', className: "input-class" }}
          className="quantity-input"
          />
          <button onClick={handleIncrement} className="quantity-button qb-right"> + </button>
        </Box>
      </div>
      <div id='cartproduct-price'>
        <p>${(product.price * product.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
};

export default CartProduct;
