//

/* eslint-disable react/no-array-index-key */

import React from 'react';

import content from '../../data/content/resume.json';

const ResumeSummary = () => {
	return (
		<section>
			<input type="checkbox" className="read-more-state" id="post-summary" />

			<a name="summary" />

			<h2>Summary</h2>
			<div className="read-more-wrap">
				{content.summary.map((item, index) => (
					<p key={index} className={index !== 0 ? 'read-more-target' : ''}>
						{item}
					</p>
				))}
			</div>

			<label htmlFor="post-summary" className="read-more-trigger" />
		</section>
	);
};

export default ResumeSummary;
