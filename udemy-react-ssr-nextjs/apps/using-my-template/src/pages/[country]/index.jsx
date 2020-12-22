
import React, { useEffect } from 'react';

import axios from 'axios';

const Home = (props) => {
	console.log('Home; props ', props);

	// useEffect(() => {
	// 	axios.get('http://api.tvmaze.com/schedule/web?date=2020-05-29&country=US')
	// 		.then(response => console.log(response.data))
	// }, []);

	const renderShows = () => {
		console.log('renderShows');
		return props.shows.map((show, index) => {
			console.log('renderShows; map');
			return (
				<li key={show.id}>{show.name}</li>
			)
		})
	}
	return (
		<ul className="tvshows">{renderShows()}</ul>
	);
}

Home.getInitialProps = async () => {
	const response = await axios.get('http://api.tvmaze.com/schedule/web?date=2020-05-29&country=US');
	console.log('Home; getInitialProps; response ', response);
	return {
		shows: response.data
	}
}
export default Home;
