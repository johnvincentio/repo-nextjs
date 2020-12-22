
import React from 'react';

import styles from './Thumbnail.module.scss';

const Thumbnail = ({ imageUrl, caption }) => {
	// console.log('Thumbnail');
	// console.log('styles ', styles);
	const jv = 0;
	return (
		<div className={styles.thumbnail}>
			<img className={styles.thumbnail__image} src={imageUrl} alt={caption} />
			<h3 className={styles.thumbnail__caption}>{caption}</h3>
		</div>
	);
}


export default Thumbnail;

/*
const Thumbnail = ({ imageUrl, caption }) => 
	// console.log('Thumbnail');
	 (
		<div className="thumbnail">
			<img className="thumbnail__image" src={imageUrl} alt={caption} />
			<h3 className="thumbnail__caption">{caption}</h3>
		</div>
	)
*/
