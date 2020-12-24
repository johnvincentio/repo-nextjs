
/*
Will only be rendered in production mode.

In development mode, will get the stack trace.
*/

import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ statusCode }) => {
	if (statusCode === 404) {
		return <h1>The resource was not found...</h1>;
	}
	if (statusCode === 422) {
		return <h1>(422) The country code may be invalid</h1>;
	}

	return <h1>Oops! Something went wrong...</h1>;
};

export const getServerSideProps = ({ err, res }) => ({
	props: {
		statusCode: 404
	},
});

Error.propTypes = {
	statusCode: PropTypes.number
};

Error.defaultProps = {
	statusCode: 0
};

export default Error;

