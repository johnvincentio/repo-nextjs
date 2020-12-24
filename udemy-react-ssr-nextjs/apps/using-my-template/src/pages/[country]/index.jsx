
/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import Error from 'next/error';

import cookies from 'nookies';

import axios from 'axios';

import MainLayout from '../../components/MainLayout';
import Thumbnail from '../../components/Thumbnail';

const Country = ({ shows, country, statusCode }) => {
	// console.log('Country; props ', props);
	if (statusCode) {
		console.log('Country; statusCode ', statusCode);
		return <Error statusCode={statusCode} />;
	}

	const renderShows = () => 
		// console.log('Country; renderShows; props.shows ', props.shows);
		  shows.map((item, index) => {
			const { show } = item;
			const imageUrl = (show.image && show.image.medium) || undefined;
			return (
				<li key={index}>
					<Thumbnail
						imageUrl={imageUrl}
						caption={show.name}
						href="/[country]/[showid]"
						as={`/${country}/${show.id}`}
					/>
				</li>
			)
		})
		
	return (
		<MainLayout>
			<ul className="country__grid">
				{renderShows()}
			</ul>
		</MainLayout>
	);
}

export const getServerSideProps = async (context) => {
	// console.log('Country; getServerSideProps; context ', context);
	try {
		const { defaultCountry } = cookies.get(context);
		const country = context.query.country || defaultCountry || 'us';

		const response = await axios.get(`http://api.tvmaze.com/schedule?country=${country}`);
		// console.log('Country; getServerSideProps; response ', response);
		return {
			props: {
				shows: response.data,
				country
			}
		};
	} catch (error) {
		return {
			props: {
				statusCode: error.response ? error.response.status : 500
			}
	 };
	}
}

Country.propTypes = {
	shows: PropTypes.array, 	// eslint-disable-line react/forbid-prop-types
	country: PropTypes.string,
	statusCode: PropTypes.number
};

Country.defaultProps = {
	shows: [],
	country: 'us',
	statusCode: 0
}

export default Country;
