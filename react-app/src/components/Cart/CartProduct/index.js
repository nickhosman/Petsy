import React, { useState } from "react";
import { thunkAddToCart, thunkRemoveFromCart, thunkLoadCart } from "../../../store/cart";
import './CartProduct.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function CartProduct({product}) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  async function handleIncrement() {
      if(product.quantity < 9) {
        await dispatch(thunkAddToCart(user.id, product.id, 1))
        await dispatch(thunkLoadCart())
        setErrors([]);
      } else {
        setErrors({'error': ' limited to 9 per customer!'})
      }
  }

  async function handleDecrement() {
      await dispatch(thunkRemoveFromCart(user.id, product.id, 1))
      await dispatch(thunkLoadCart())
      setErrors([]);
  }

  async function handleClearProduct() {
    let quantity = product.quantity
    await dispatch(thunkRemoveFromCart(user.id, product.id, quantity));
    await dispatch(thunkLoadCart());
    setErrors([]);
  };

  function handleProductPage(e) {
    e.preventDefault()
    history.push(`/products/${product.id}`)
  }

  return(
    <div id='cartproduct-container'>
      <img id='cartproduct-img' src={product.image} alt=''/>
      <div id='cartproduct-details'>
        <p onClick={(product) => handleProductPage(product)} className="cartproduct-name">{product.name}</p>
        <p>${product.price}</p>
        {errors && errors.error && <p>{errors.error}</p>}
        <Box className='cartproduct-box'>
          <button onClick={handleDecrement}  className="quantity-button qb-left" > - </button>
          <TextField
          value={product.quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputProps={{
            sx: {
              width: '38px',
              height: '30px',
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
          <button onClick={handleClearProduct} className="cart-remove-button">Remove</button>
        </Box>
      </div>
      <div id='cartproduct-price'>
        <p>${(product.price * product.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
};

export default CartProduct;
