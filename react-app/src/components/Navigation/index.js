import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul id="navigation-bar">
			<li>
				<NavLink className="nav-link" exact to="/"><i class="fa-solid fa-paw"></i>PETSY</NavLink>
			</li>
			<li id="search-bar-li">
				<SearchBar />
			</li>
			<li>
				<i class="fa-solid fa-heart fa-lg"></i>
			</li>
			{isLoaded && (
				<li id="user-profile-li">
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;