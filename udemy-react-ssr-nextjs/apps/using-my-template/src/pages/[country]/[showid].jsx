
import React from 'react';

import axios from 'axios';

import parse from 'html-react-parser';

import Cast from '../../components/Cast'
import styles from './Details.module.scss';

const Details = props => {
	// console.log('Details; props ', props);
	const { show } = props;
	const { name, image, summary, _embedded } = show;
	return (
		<div className={styles.details}>
			<div className={styles.details__poster} style={{ backgroundImage: `url(${image.original})` }} />
			<h1>{name}</h1>
			{parse(summary)}

			<Cast cast={_embedded.cast} />
		</div>
	);
}

Details.getInitialProps = async (context) => {
	console.log('ShowDetails; getInitialProps; context.query ', context.query);
	const { country, showid } = context.query;
	// const country = context.query.country || 'us';

	const response = await axios.get(`http://api.tvmaze.com/shows/${showid}?embed=cast`);
	// console.log('Details; getInitialProps; response ', response);
	return {
		show: response.data,
	}
}

export default Details;

/*
			<style jsx>{`
			`}</style>
*/
