import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSearchContext } from '../../context/Search';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import './Navigation.css';
import logo from '../images/Petsy-logo.svg'
import doggo from '../images/doggo.svg'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const {searchInput, setSearchInput} = useSearchContext()

	return (
		<ul id="navigation-bar">
			<li id="logo">
				<NavLink className="nav-link" exact to="/">
					<img className='petsy-logo' src={logo}></img>
				</NavLink>
			</li>
			<li id="search-bar-li">
				<img className='nav-peekingdoggo' src={doggo}></img>
				<SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
			</li>
			{isLoaded && (
			<div className='navigation-bar-right'>
				{sessionUser &&
					<NavLink style={{ textDecoration: "none", color: "black" }} exact to={`/users/${sessionUser?.id}/favorites`}>
					<i id='nav-heart-icon' class="fa-sharp fa-regular fa-heart"></i>
					</NavLink>}
				<li id="user-profile-li">
					<ProfileButton user={sessionUser} />
				</li>
			</div>
			)}
		</ul>
	);
}

export default Navigation;
