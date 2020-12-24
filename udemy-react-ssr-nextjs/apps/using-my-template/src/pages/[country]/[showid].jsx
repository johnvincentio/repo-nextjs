
import React from 'react';
import PropTypes from 'prop-types';

import parse from 'html-react-parser';

import axios from 'axios';

import MainLayout from '../../components/MainLayout';
import Cast from '../../components/Cast'

const Details = ({ show }) => {
	console.log('Details; show ', show);
	const { name, image, summary, _embedded } = show;
	return (
		<MainLayout>
			<div className="details">
				<div className="details__poster" style={{ backgroundImage: `url(${image.original})` }} />
				<h1>{name}</h1>
				{parse(summary)}

				{_embedded.cast.length > 0 && <Cast cast={_embedded.cast} />}
			</div>
		</MainLayout>
	);
}

export const getServerSideProps = async (context) => {
	try {
		console.log('Details; getComponentServerSideProps; props.query ', context.query);
		const { showid } = context.query;
		// const country = context.query.country || 'us';

		const response = await axios.get(`http://api.tvmaze.com/shows/${showid}?embed=cast`);
		console.log('Details; getInitialProps; response ', response);
		return {
			props: {
				show: response.data
			}
		};
	}
	catch (error) {
		return {
			props: {
				statusCode: error.response ? error.response.status : 500
			}
		};
	}
}

Details.propTypes = {
	show: PropTypes.object		// eslint-disable-line react/forbid-prop-types
};

Details.defaultProps = {
	show: {}
};

export default Details;

