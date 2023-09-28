import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink ,useHistory} from "react-router-dom"


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history=useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button id="profile-btn" onClick={openMenu}>
        <i class="fa-solid fa-user fa-xl"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="k-loggedin-container">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <NavLink style={{ textDecoration: "none", color: "black" }}
                onClick={closeMenu}
                to="/products/new">
            <div>Create a Listing</div>
            </NavLink>
            <li>
            </li>
            <NavLink style={{ textDecoration: "none", color: "black" }}
                onClick={closeMenu}
                to={`/users/${user.id}/products`}>
            <div>View My Listings</div>
            </NavLink>
            <li id='log-out-btn-div'>
              <button id="log-out-btn" onClick={handleLogout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
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
