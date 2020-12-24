
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

const Thumbnail = ({ imageUrl, caption, href, as, small }) => {
	console.log('Thumbnail; imageUrl ', imageUrl, ' caption ', caption, ' href ', href, ' as ', as);
	const clzSize = small ? `large` : `small`;

	if (! href || ! as) return (
		<div className="thumbnail">
			<img className={`thumbnail__image ${clzSize}`} src={imageUrl} alt={caption} />
			<div className="thumbnail__caption">{caption}</div>
		</div>
	);

	return (
		<div className="thumbnail">
			<Link href={href} as={as}>
				<a>
					<img className={`thumbnail__image ${clzSize}`} src={imageUrl} alt={caption} />
					<div className="thumbnail__caption">{caption}</div>
				</a>
			</Link>
		</div>
	);
};

Thumbnail.propTypes = {
	imageUrl: PropTypes.string,
	caption: PropTypes.string.isRequired,
	href: PropTypes.string,
	as: PropTypes.string,
	small: PropTypes.bool,
};

Thumbnail.defaultProps = {
	imageUrl: `https://via.placeholder.com/210x295?text=?`,
	href: undefined,
	as: undefined,
	small: false
};

export default Thumbnail;
