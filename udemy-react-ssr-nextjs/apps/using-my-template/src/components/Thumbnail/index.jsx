
import React from 'react';
import Link from 'next/link';

import styles from './Thumbnail.module.scss';

const Thumbnail = ({ imageUrl, caption, href = '', as = '' }) => {
	// console.log('Thumbnail');
	// console.log('styles ', styles);
	const jv = 0;
	return (
		<div className={styles.thumbnail}>
			<Link href={href} as={as}>
				<a>
					<img className={styles.thumbnail__image} src={imageUrl} alt={caption} />
					<h5 className={styles.thumbnail__caption}>{caption}</h5>
				</a>
			</Link>
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
