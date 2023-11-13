import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Drawer from "@mui/material/Drawer";
import Loader from '../../Loader/index.js';
import { thunkLoadCart } from "../../../store/cart";
import CartProduct from "../CartProduct/index.js";
import './CartDrawer.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";

function CartDrawer({ showCart, setShowCart }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.session.user)
    const drawerRef = useRef();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try{
                await dispatch(thunkLoadCart())
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [showCart, setShowCart, dispatch])

    useEffect(() => {
    const handleDrawerClickOutside = (e) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target)) {
            setShowCart(false);
        }
    };
    if (showCart) {
        document.addEventListener("mousedown", handleDrawerClickOutside);
    }
    return () => {
        document.removeEventListener("mousedown", handleDrawerClickOutside);
        };
    }, [showCart, setShowCart]);

    const closeCart = () => {
        setShowCart(!showCart);
    };

    function calculateTotal() {
        let total = 0;
        cart.products.map(product => {
            total += (product.price * product.quantity)
        })
        return total.toFixed(2)
    };

    function handleCartCheckout(e) {
        e.preventDefault();
        history.push(`/users/${user.id}/cart`)
        setShowCart(!showCart)
    }

    return (
        <Drawer
        anchor="right"
        open={showCart}
        onClose={closeCart}
        variant="persistent"
        hideBackdrop={false}
        ref={drawerRef}
        sx={{ width: 490 }}
        PaperProps={{ style: { width: 490 } }}>
        {!cart.products ?
        <div id='cartdrawer-container'>
            <p className="cartdrawer-title">Your Cart (0)</p>
            <div className="noproducts-cart">
            <p>Your cart currently has no products</p>
            </div>
        </div>
        :
        <>
        <div id='cartdrawer-container'>
            <p className="cartdrawer-title">Your Cart ({cart.products.length})</p>
            {cart && cart.products.length ?
            <>
            {cart.products.map(product => (
                <CartProduct key={product.id} product={product} />
            ))} </> :
            <div className="noproducts-cart">
            <p>Your cart currently has no products</p>
            </div>}
        </div>
        {cart && cart.products.length ?
        <div id="checkout-container">
        <p>Your Total: ${calculateTotal()}</p>
        <button onClick={handleCartCheckout} className="petsy-button">Continue to checkout</button>
        </div> : null}
        </>
        }
    </Drawer>
    );
}

export default CartDrawer;
