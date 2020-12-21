//

/* eslint-disable react/no-array-index-key */

import React from 'react';

import content from '../../data/content/resume.json';

const ResumeEducation = () => {
	// console.log('ResumeEducation; content ', content);
	return (
		<section>
			<input type="checkbox" className="read-more-state" id="post-education" />

			<a name="education" />

			<h2>Education</h2>

			<div className="read-more-wrap">
				{content.education.map((item, index) => (
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
							{item.tasks
								&& item.tasks.map((task, idx2) => (
									<div key={idx2} className="tasks">
										<p>{task}</p>
									</div>
								))}
						</div>
					</div>
				))}
			</div>

			<label htmlFor="post-education" className="read-more-trigger" />
		</section>
	);
};

export default ResumeEducation;
