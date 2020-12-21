//

/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */

import React from 'react';

import content from '../../data/content/resume.json';

const ResumeExperience = () => {
	// console.log('ResumeExperience; content ', content);
	return (
		<section>
			<input type="checkbox" className="read-more-state" id="post-experience" />

			<a name="experience" />

			<h2>Experience</h2>

			<div className="read-more-wrap">
				{content.experience.map((item, index) => (
					<div key={index} className={index !== 0 ? 'read-more-target' : ''}>
						<div className="organization-group">
							<div className="organization-image">
								<img src={item.image} alt={item.name} />
							</div>

							<div className="organization">
								<h3>{item.position}</h3>
								<h4>
									<a href={item.link}>{item.name}</a>
								</h4>
								<h5>{item.dates}</h5>
							</div>
						</div>

						<div className="tasks">
							{item.tasks.map((task, idx2) => (
								<div key={idx2} className="tasks">
									<p>{task}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<label htmlFor="post-experience" className="read-more-trigger" />
		</section>
	);
};

export default ResumeExperience;
