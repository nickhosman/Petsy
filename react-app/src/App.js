import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProductIndex from "./components/Product/ProductIndex";
import ProductDetails from "./components/Product/ProductDetails";
import ProductFormPage from "./components/Product/ProductForm";
import ProductUpdateForm from "./components/Product/ProductUpdateForm";
import ListingPage from "./components/Listing";
import FavoritePage from "./components/Favorites";
import Home from "./components/Home";
import Search from "./components/Search/Search";
import Footer from "./components/Home/Footer/Footer";
import { Drawer } from "@mui/material";
import { useCartContext } from "./context/Cart";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const { showCart, setShowCart } = useCartContext();
    const cartRef = useRef();

    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        const handleDrawerClick = (e) => {
            const drawer = document.querySelector(".MuiDrawer-root");
            if (!drawer.contains(e.target)) setShowCart(false);
        };

        if (showCart) {
            document.addEventListener("mousedown", handleDrawerClick);
        }
    }, [showCart]);

    const closeCart = () => {
        setShowCart(!showCart);
    };

    return (
        <div id="page-container">
            <Drawer
                anchor="right"
                open={showCart}
                onClose={() => {
                    setShowCart(false);
                }}
                variant="persistent"
                hideBackdrop={false}
                ref={cartRef}
            >
                <div id="cart-close" onClick={closeCart}>
                    X
                </div>
                <p className="cart-item"> Test </p>
                <p className="cart-item"> Test </p>
                <p className="cart-item"> Test </p>
                <p className="cart-item"> Test </p>
                <p className="cart-item"> Test </p>
                <p className="cart-item"> Test </p>
            </Drawer>
            <div id="content-wrap">
                <Navigation isLoaded={isLoaded} />
                <div id="gray-bar"></div>
                {isLoaded && (
                    <Switch>
                        <Route exact path="/users/:userId/products">
                            <ListingPage />
                        </Route>
                        <Route exact path="/users/:userId/favorites">
                            <FavoritePage />
                        </Route>
                        <Route exact path="/products">
                            <ProductIndex />
                        </Route>
                        <Route exact path="/products/new">
                            <ProductFormPage />
                        </Route>
                        <Route exact path="/products/:productId/edit">
                            <ProductUpdateForm />
                        </Route>
                        <Route exact path="/products/:productId">
                            <ProductDetails />
                        </Route>
                        <Route path="/login">
                            <LoginFormPage />
                        </Route>
                        <Route path="/signup">
                            <SignupFormPage />
                        </Route>
                        <Route path={`/search`}>
                            <Search />
                        </Route>
                        <Route path="/">
                            <Home
                                searchInput={searchInput}
                                setSearchInput={setSearchInput}
                            />
                        </Route>
                    </Switch>
                )}
            </div>
            <Footer isLoaded={isLoaded} />
        </div>
    );
}

export default App;
