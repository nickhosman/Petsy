import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import cats from '../images/cats.svg'

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstname, lastname));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors({
				passwordNotMatching: "Confirm Password field must be the same as the Password field",
			});
		}
	};

	return (
		<div id="signup-modal-div">
			<img className="peepingcats" src={cats}></img>
			<h1>Sign Up</h1>
			<form id="signup-modal-form" onSubmit={handleSubmit}>
				{/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors && errors.email &&
					<p id="error-msg">{errors.email}</p>
				}
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errors && errors.username &&
					<p id="error-msg">{errors.username}</p>
				}
				<label>
					First Name
					<input
						type="text"
						name="first_name"
						value={firstname}
						onChange={(e) => {
							setFirstname(e.target.value)
						}}
						required
					/>
				</label>
				{errors && errors.first_name &&
					<p id="error-msg">{errors.first_name}</p>
				}
				<label>
					Last Name
					<input
						type="text"
						name="last_name"
						value={lastname}
						onChange={(e) => {
							setLastname(e.target.value)
						}}
						required
					/>
				</label>
				{errors && errors.last_name &&
					<p id="error-msg">{errors.last_name}</p>
				}
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors && errors.password &&
					<p id="error-msg">{errors.password}</p>
				}
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors && errors.passwordNotMatching &&
					<p id="error-msg">{errors.passwordNotMatching}</p>
				}
				<button id="signup-form-submit-btn" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
