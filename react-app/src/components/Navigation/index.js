import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchContext } from "../../context/Search";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import "./Navigation.css";
import logo from "../images/Petsy-logo.svg";
import doggo from "../images/doggo.svg";
import { useCartContext } from "../../context/Cart";
import { thunkLoadCart } from "../../store/cart";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const { searchInput, setSearchInput } = useSearchContext();
    const { showCart, setShowCart } = useCartContext();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(thunkLoadCart())
    }, [dispatch])


    return (
        <>
        <ul id="navigation-bar">
            <li id="logo">
                <NavLink className="nav-link" exact to="/">
                    <img className="petsy-logo" src={logo}></img>
                </NavLink>
            </li>
            <li id="search-bar-li">
                <img className="nav-peekingdoggo" src={doggo}></img>
                <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}/>
            </li>
                {isLoaded && (
                <div className="navigation-bar-right">
                    {sessionUser && (
                        <>
                        <NavLink style={{ textDecoration: "none", color: "black",}} exact to={`/users/${sessionUser?.id}/favorites`}>
                            <i id="nav-heart-icon" class="fa-sharp fa-regular fa-heart"></i>
                        </NavLink>
                        <IconButton aria-label="cart" onClick={() => {setShowCart(!showCart)}}>
                            <Badge badgeContent={cart.products && cart.products.length}  sx={{
                                '& .MuiBadge-badge': {
                                    height:'20px',
                                    backgroundColor: 'rgb(194, 39, 39)',
                                    color: 'white',
                                }
                                }}>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        </>
                        )}
                    <li id="user-profile-li">
                        <ProfileButton user={sessionUser} />
                    </li>
                    </div>
                )}
            </ul>
        </>
    );
}

export default Navigation;
