
import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from './Thumbnail';

const Cast = ({ cast }) => {
	// console.log('Cast; cast ', cast);
	const renderCast = () => cast.map((item, index) => {
		const { name, image } = item.person;
		const imageUrl = (image && image.medium) || undefined;

		return (
			// eslint-disable-next-line react/no-array-index-key
			<li key={index}>
				<Thumbnail
					imageUrl={imageUrl}
					caption={name}
					small
				/>
			</li>
		)
	})
	return (
		<div className="cast">
			<h3>Cast</h3>
			<ul className="cast__list">
				{renderCast()}
			</ul>
		</div>
	)
}

Cast.propTypes = {
	cast: PropTypes.array		// eslint-disable-line react/forbid-prop-types
};

Cast.defaultProps = {
	cast: []
}

export default Cast;
