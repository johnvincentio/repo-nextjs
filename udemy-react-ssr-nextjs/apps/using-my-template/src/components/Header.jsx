
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import cookies from 'nookies';
import { isAuthenticated } from '../utils/withAuthorization';

const countries = [
	{
		label: 'us',
		name: 'United States',
	},
	{
		label: 'fr',
		name: 'France',
	},
	{
		label: 'gb',
		name: 'Great Britain',
	},
	{
		label: 'in',
		name: 'India',
	},
	{
		label: 'br',
		name: 'Brazil',
	},
];

const Header = () => {
	const router = useRouter();
	const [selectedCountry, setSelectedCountry] = useState(router.query.country);

	const handleChange = (e) => {
		setSelectedCountry(e.target.value);

		router.push(`/[country]`, `/${e.target.value}`);
	};

	const renderCountries = () => countries.map((country) => (
		<option key={country.label} value={country.label}>
			{country.name}
		</option>
	));
	
	const handleSignout = () => {
		console.log('handleSignout');
		cookies.destroy(null, 'token');
	};

	useEffect(() => {
		if (selectedCountry) {
			cookies.set(null, 'defaultCountry', selectedCountry, {
				maxAge: 30 * 24 * 60 * 60,
				path: '/',
			});
		}
	}, [selectedCountry]);

	return (
		<div className="header">
			<select value={selectedCountry} onChange={handleChange}>
				{renderCountries()}
			</select>

			{isAuthenticated() && (
				// <div>
				<Link href="/[country]" as={`/${cookies.get().defaultCountry}`}>
					<a onClick={handleSignout}>sign out</a>
				</Link>
				// </div>
			)}
		</div>
	);
};

export default Header;
