import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Drawer from "@mui/material/Drawer";
import Loader from '../../Loader/index.js';
import { thunkLoadCart } from "../../../store/cart";
import CartProduct from "../CartProduct/index.js";
import './CartDrawer.css'

function CartDrawer({ showCart, setShowCart }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const cart = useSelector(state => state.cart);
    const drawerRef = useRef();

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
    if(!cart || !cart.products) return null
    console.log('carttt', cart.products)
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
        <div id='cartdrawer-container'>
            <p>Your Cart ({cart.products.length})</p>
            {cart && cart.products.map(product => (
                <CartProduct key={product.id} product={product} />
            ))}
        </div>
    </Drawer>
    );
}

export default CartDrawer;
