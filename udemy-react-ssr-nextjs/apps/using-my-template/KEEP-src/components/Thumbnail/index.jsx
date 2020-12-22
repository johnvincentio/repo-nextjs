
import React from 'react';

const Thumbnail = ({ imageUrl, caption }) => {
	console.log('Thumbnail');
	return (
		<div className="thumbnail">
			<img className="thumbnail__image" src={imageUrl} alt={caption} />
			<h3 className="thumbnail__caption">{caption}</h3>
		</div>
	)
}

export default Thumbnail;
