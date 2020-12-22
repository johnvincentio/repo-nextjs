
import React from 'react';

import axios from 'axios';

import styles from './ShowDetails.module.scss';

const ShowDetails = props => {
	console.log('ShowDetails; props ', props);
	const { show } = props;
	const { name, image } = show;
	return (
		<div className="show-details">
			<div className="show-details__poster" style={{ backgroundImage: `url(${image.original})`}} />
			<h1>{name}</h1>


		</div>
	);
}

ShowDetails.getInitialProps = async (context) => {
	// console.log('ShowDetails; getInitialProps; context ', context);
	// const country = context.query.country || 'us';

	const response = await axios.get(`http://api.tvmaze.com/shows/1?embed=cast`);
	console.log('ShowDetails; getInitialProps; response ', response);
	return {
		show: response.data,
	}
}

export default ShowDetails;

/*
			<style jsx>{`
			`}</style>
*/
