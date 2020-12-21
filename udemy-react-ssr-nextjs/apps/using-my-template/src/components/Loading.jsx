//

import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
	const { pastDelay } = props;
	return <span>{pastDelay ? <h3>Loading...</h3> : null}</span>;
};

Loading.propTypes = {
	pastDelay: PropTypes.bool.isRequired,
};

export default Loading;
