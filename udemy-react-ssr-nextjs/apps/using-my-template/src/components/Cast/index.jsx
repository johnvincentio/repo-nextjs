
import React from 'react';

import Thumbnail from '../Thumbnail';

import styles from './Cast.module.scss';

const Cast = ({ cast }) => {
	console.log('Cast; cast ', cast);
	const renderCast = () => cast.map((item, index) => {
		const { name, image } = item.character;
		const imageUrl = (image && image.medium) ? image.medium : `https://via.placeholder.com/210x295?text=?`;
		return (
			<li key={index}>
				<Thumbnail
					imageUrl={imageUrl}
					caption={name}
				>
					in thumbnail
				</Thumbnail>
			</li>
		)
	})
	return (
		<div className="cast">
			<h3>h3 Cast</h3>
			<ul className={styles.cast__list}>
				{renderCast()}
			</ul>
		</div>
	)
}

export default Cast;
