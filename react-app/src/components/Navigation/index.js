import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSearchContext } from '../../context/Search';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [searchInput, setSearchInput] = useSearchContext()

	return (
		<ul id="navigation-bar">
			<li id="logo">
				<NavLink className="nav-link" exact to="/"><i class="fa-solid fa-paw"></i><p>PETSY</p></NavLink>
			</li>
			<li id="search-bar-li">
				<SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
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
