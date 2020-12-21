//

/* eslint-disable react/no-array-index-key */

import React from 'react';

import content from '../../data/content/resume.json';

const ResumeKeySkills = () => {
	// console.log('ResumeKeySkills; content ', content);
	return (
		<section>
			<input type="checkbox" className="read-more-state" id="post-skills" />

			<a name="key-skills" />

			<h2>Key Skills</h2>

			<div className="read-more-wrap">
				{content.skills.map((item, index) => (
					<div key={index} className={index !== 0 ? 'read-more-target' : ''}>
						<div className="skills">
							<h4>{item.name}</h4>
							<p>{item.skills}</p>
						</div>
					</div>
				))}
			</div>

			<label htmlFor="post-skills" className="read-more-trigger" />
		</section>
	);
};

export default ResumeKeySkills;
