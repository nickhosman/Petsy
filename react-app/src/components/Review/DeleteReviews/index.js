import React, {useEffect, useState} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginFormModal from '../LoginFormModal';
import logo from '../images/logo.png'
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Navigation({ isLoaded }){
	const [email, setEmail] = useState("")
	const [errors, setErrors] = useState([])
	const sessionUser = useSelector(state => state.session.user);
	// if (sessionUser) return <Redirect to="/" />;
	const history = useHistory()
	const handleViewTasks = e => {
		e.preventDefault()
		history.push('/tasks')
	}

	if(sessionUser) {
		document.getElementById("bg").style.display = "none";
	}else if ( document.getElementById("bg") !== null ) {
		document.getElementById("bg").style.display = "";
	}

	function canUse(feature) {
		const element = document.createElement('div');
		const prefixes = ' Khtml Ms O Moz Webkit'.split(' ');
		const upper = feature.charAt(0).toUpperCase() + feature.substr(1);

		if (feature in element.style) return true;

		for (let i = 0; i < prefixes.length; i++) {
			if ((prefixes[i] + upper) in element.style) return true;
		}

		return false;
		}

		var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			// !function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();
			function customClassList(el) {
				this.el = el;
				const classes = el.className.replace(/^\s+|\s+$/g, "").split(/\s+/);

				for (let i = 0; i < classes.length; i++) {
					this.add(classes[i]);
				}
			}

			function defineProperty(obj, prop, getter) {
				if (Object.defineProperty) {
					Object.defineProperty(obj, prop, { get: getter });
				} else {
					obj.__defineGetter__(prop, getter);
				}
			}

			if (typeof window.Element === 'undefined' || !('classList' in document.documentElement)) {
				const proto = customClassList.prototype;
				const arrProto = Array.prototype;

				proto.add = function (className) {
					if (!this.contains(className)) {
						arrProto.push.call(this, className);
						this.el.className = this.toString();
					}
				};

				proto.contains = function (className) {
					return this.el.className.indexOf(className) !== -1;
				};

				proto.item = function (index) {
					return this[index] || null;
				};

				proto.remove = function (className) {
					if (this.contains(className)) {
						for (let i = 0; i < this.length; i++) {
							if (this[i] === className) {
								arrProto.splice.call(this, i, 1);
								this.el.className = this.toString();
								return;
							}
						}
					}
				};

				proto.toString = function () {
					return arrProto.join.call(this, ' ');
				};

				proto.toggle = function (className) {
					if (this.contains(className)) {
						this.remove(className);
					} else {
						this.add(className);
					}
					return this.contains(className);
				};

				defineProperty(Element.prototype, 'classList', function () {
					return new customClassList(this);
				});
			}


		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

		useEffect(() => {
			// Settings for your background images and delay.
			const settings = {
				images: {
					'images/palmtrees.jpg': 'center',
					'images/bridge.jpg': 'center',
					'images/beach2.jpg': 'center',
					'images/boat.jpg': 'center',
					'images/unset.jpg': 'center',
					'images/pomp.jpg': 'top',
					'images/japan.jpg': 'center',
				},
				delay: 6000
			};

			// Vars.
			let pos = 0, lastPos = 0;
			let $wrapper, $bgs = [], $bg;
			let k;

			// Reference to the body element.
			const $body = document.body;

			// Create BG wrapper, BGs.
			$wrapper = document.createElement('div');
			$wrapper.id = 'bg';
			$body.appendChild($wrapper);

			for (k in settings.images) {
				// Create BG.
				$bg = document.createElement('div');
				$bg.style.backgroundImage = 'url("' + k + '")';
				$bg.style.backgroundPosition = settings.images[k];
				$wrapper.appendChild($bg);

				// Add it to array.
				$bgs.push($bg);
			}

			// Main loop.
			$bgs[pos].classList.add('visible');
			$bgs[pos].classList.add('top');

			// Check if there's only one BG or if the client doesn't support transitions.
			if ($bgs.length === 1 || !canUse('transition')) {
				return;
			}

			const intervalId = setInterval(function () {
				lastPos = pos;
				pos++;

				// Wrap to beginning if necessary.
				if (pos >= $bgs.length) {
					pos = 0;
				}

				// Swap top images.
				$bgs[lastPos].classList.remove('top');
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Hide the last image after a short delay.
				setTimeout(function () {
					$bgs[lastPos].classList.remove('visible');
				}, settings.delay / 2);
			}, settings.delay);

			// Clear the interval when the component unmounts.
			return () => clearInterval(intervalId);
		}, []);

	if (!sessionUser) return (
		<div className='landing-page'>
			<div className='empty-div'></div>
			<ul className='header-nouser'>
				<h1 className='title-section'>
					<NavLink className='title' exact to="/">Focus Flow</NavLink>
					{/* <img className='logo' src={logo}></img> */}
				</h1>
			<div>
				<h2 className='inner-text-header'>Get a clear overview of everything on your plate and never lose track of an important task.</h2>
			</div>
				<li className='signup-login-btns'>
					{/* <ProfileButton user={sessionUser} /> */}
					{/* <TextField size="small" id="outlined-basic" helperText={errors.email} error ={ errors.email } label="Email" variant="outlined" type="text" value={email} onClick={handleSubmit}  /> */}
					<OpenModalButton
						buttonText='Log In'
						modalComponent={<LoginFormModal />}
						styleClass='Sign-up-btn'
					/>
					<OpenModalButton
						buttonText='Start For Free'
						modalComponent={<SignupFormModal />}
						styleClass='Sign-up-btn'
					/>
				</li>
			</ul>
			<div className='text1'>
				<div className='center-text'>
					<span className='quote'>"The key to happiness is really progress and growth and constantly working on yourself and developing something..." -Lewis Howes</span>
					{/* <span className='author'> -Lewis Howes</span> */}
				</div>
			</div>
		</div>
	)

	return (
		<ul className='page-header'>
			<h1 className='title-section'>
				<NavLink className='title-task-index' exact to="/">Focus Flow</NavLink>
				<img className='logo' src={logo}></img>
			</h1>
			<div className='tasks-profile-btn'>
				<p>
					{/* <NavLink className='tasks-link' exact to='/tasks'>
						<FontAwesomeIcon icon={faListCheck} style={{ color: '#403234' }} />
					</NavLink> */}
					<button className='tasks-link' onClick={handleViewTasks}>View Tasks</button>
				</p>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</div>
		</ul>
	);
}

export default Navigation;
