
/* eslint-disable react/no-array-index-key */

import React, { useEffect } from 'react';

import axios from 'axios';

import Thumbnail from '../../components/Thumbnail';

import styles from './Country.module.scss';

const Country = ({ shows, country }) => {
	// console.log('Home; props ', props);

	// useEffect(() => {
	// 	axios.get('http://api.tvmaze.com/schedule/web?date=2020-05-29&country=US')
	// 		.then(response => console.log(response.data))
	// }, []);

	const renderShows = () => 
		// console.log('renderShows; props.shows ', props.shows);
		 shows.map((item, index) => {
			 const { show } = item;
			const image = (! show.image) ? `https://via.placeholder.com/210x295?text=?`: show.image.medium;
			return (
				<li key={index}>
					<Thumbnail imageUrl={image} caption={show.name} href="/[country]/[showId]" as={`/${country}/${show.id}`} />
				</li>
			)
		})
	
	return (
		<ul className={styles.country__grid}>
			{renderShows()}
		</ul>
	);
}

Country.getInitialProps = async (context) => {
	// console.log('Home; getInitialProps; context ', context);
	const country = context.query.country || 'us';

	const response = await axios.get(`http://api.tvmaze.com/schedule?country=${country}&date=2020-12-21`);
	// console.log('Home; getInitialProps; response ', response);
	return {
		shows: response.data,
		country
	}
}

export default Country;
