
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

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

const Header = (props) => {
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
	
	return (
		<div className="header">
			<select value={selectedCountry} onChange={handleChange}>
				{renderCountries()}
			</select>

			{/* {isAuthenticated() && (
				<Link href="/[country]" as={`/${cookies.get().defaultCountry}`}>
					<a onClick={handleSignout}>sign out</a>
				</Link>
			)} */}

		</div>
	);

};



export default Header;
