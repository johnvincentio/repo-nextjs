//

import React from 'react';

import PropTypes from 'prop-types';

import Header from './Header';

const MainLayout = (props) => {
	const {	children } = props;
	return (
		<>
			<Header />
			{children}
		</>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default MainLayout;
