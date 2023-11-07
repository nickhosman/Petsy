import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        console.log("BUTTON IS WORKING");
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current?.contains(e.target)) {
                setShowMenu(false);
                console.log("")
                console.log("CLOSE MENU", e.target);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push("/");
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button id="profile-btn" onClick={openMenu}>
                <i class="fa-solid fa-bars"></i>
                <i id="nav-user-icon" class="fa-regular fa-user fa-xl"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <div className="k-loggedin-container">
                        <div id="loggedin-userinfocontainer">
                            <img
                                className="loggedin-defaultprofilepic"
                                src="https://i.ibb.co/1LCJZZZ/Default-pfp-svg.png"
                            ></img>
                            <div className="loggedin-profilepiccontainer">
                                <p>
                                    <strong>{user.username}</strong>
                                </p>
                                <p className="useremail">{user.email}</p>
                            </div>
                        </div>
                        <div className="loggedin-line"></div>
                        <NavLink
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={closeMenu}
                            to="/products/new"
                        >
                            <li>+ Sell on Petsy</li>
                        </NavLink>
                        <div className="loggedin-line"></div>
                        <NavLink
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={closeMenu}
                            to={`/users/${user.id}/products`}
                        >
                            <li>ฅ View Listings</li>
                        </NavLink>
                        <div className="loggedin-line"></div>
                        <button id="log-out-btn" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                ) : (
                    <>
                        <OpenModalButton
                            buttonText="Log In"
                            styleClass="signup-login-btn"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />

                        <OpenModalButton
                            buttonText="Sign Up"
                            // styleClass= "signup-login-btn"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
