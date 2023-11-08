import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Drawer from "@mui/material/Drawer";
import Loader from '../../Loader/index.js';
import { thunkLoadCart } from "../../../store/cart";

function CartDrawer({ showCart, setShowCart }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const cart = useSelector(state => state.cart);
    const drawerRef = useRef();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try{
                console.log('zzzzzz')
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


    console.log('carttt', cart)
    return (
        <Drawer
        anchor="right"
        open={showCart}
        onClose={closeCart}
        variant="persistent"
        hideBackdrop={false}
        ref={drawerRef}
        sx={{ width: 350 }}
        PaperProps={{ style: { width: 250 } }}
    >
    <p>testing</p>
    <p>testing</p>
    <p>testing</p>
    </Drawer>
    );
}

export default CartDrawer;
