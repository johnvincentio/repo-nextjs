//

/* eslint-disable react/no-array-index-key */

import React from 'react';

import content from '../../data/content/resume.json';

const ResumeProjects = () => {
	// console.log('ResumeProjects; content ', content);
	return (
		<section>
			<input type="checkbox" className="read-more-state" id="post-projects" />

			<a name="projects" />

			<h2>Projects</h2>

			<div className="read-more-wrap">
				{content.projects.map(
					(item, idx1) => item.name && (
						<div key={idx1} className={idx1 !== 0 ? 'read-more-target' : ''}>
							<div className="organization-group">
								<div className="organization-image">
									<img src={item.image} alt={item.name} />
								</div>

								<div className="organization">
									<h3>{item.position}</h3>
									{item.link && (
										<h4>
											<a href={item.link}>{item.name}</a>
										</h4>
									)}
									{!item.link && <h4>{item.name}</h4>}
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

							{item.responsibilities && (
								<div className="skills">
									<h4>Specific responsibilities include</h4>
									<ul>
										{item.responsibilities.map((task, idx2) => (
											<li key={idx2}>{task}</li>
										))}
									</ul>
								</div>
							)}

							{item.details && (
								<p>
										See
									{' '}
									<a href={item.details}>
										{item.name}
										{' Overview '}
									</a>
									{' for more details.'}
								</p>
							)}

							{item.technologies
									&& item.technologies.map((skill, idx2) => (
										<div key={idx2} className="skills">
											<h4>{skill.name}</h4>
											<p>{skill.skills}</p>
										</div>
									))}
						</div>
					),
				)}
			</div>

			<label htmlFor="post-projects" className="read-more-trigger" />
		</section>
	);
};

export default ResumeProjects;
