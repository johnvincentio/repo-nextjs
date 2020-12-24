
import React, { useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import axios from 'axios';
import cookies from 'nookies';

import CustomInput from '../components/CustomInput';
import validateEmail from '../utils/validators/validateEmail';
import validateRequired from '../utils/validators/validateRequired';

const initialState = {
	email: '',
	password: ''
};

const Signin = () => {
	const [signinInfo, setSigninInfo] = useState(initialState);
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async e => {
		e.preventDefault();

		const { email, password } = signinInfo;
		if (!email || !password) {
			return;
		}

		try {
			const response = await axios.post(process.env.SERVER_URL,
				{ apiKey: process.env.API_KEY, ...signinInfo }
			);
			cookies.set(null, 'token', response.data.token, { path: '/' });
			const { plannedRoute } = cookies.get();
			console.log('plannedRoute ', plannedRoute);

			const parsedPlannedRoute = plannedRoute && JSON.parse(plannedRoute);
			console.log('parsedPlannedRoute ', parsedPlannedRoute);

			const plannedHrefRoute = parsedPlannedRoute
				? parsedPlannedRoute.href
				: '/[country]';
			const plannedAsRoute = parsedPlannedRoute ? parsedPlannedRoute.as : '/us';
			console.log('plannedHrefRoute ', plannedHrefRoute);
			console.log('plannedAsRoute ', plannedAsRoute);

			router.replace(plannedHrefRoute, plannedAsRoute);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setSigninInfo({
			...signinInfo,
			[name]: value
		});
	};

	return (
		<div className="signin">
			<form onSubmit={handleSubmit}>
				<CustomInput
					name="email"
					placeholder="Enter your email"
					value={signinInfo.email}
					onChange={handleInputChange}
					onBlur={validateEmail}
				/>
				<CustomInput
					name="password"
					placeholder="Enter your password"
					type="password"
					value={signinInfo.password}
					onChange={handleInputChange}
					onBlur={validateRequired}
				/>

				{error && <div className="error">{error}</div>}

				<Link href="/signup">
					<a>Create an account</a>
				</Link>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Signin;

