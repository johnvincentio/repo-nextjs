//

import React from 'react';

import { MainLayout, SubpageHeader, createMetaData } from '../components';

import {
	ResumeSummary,
	ResumeExperience,
	ResumeProjects,
	ResumeKeySkills,
	ResumeEducation,
} from '../components/resume';

import json from '../data/pages/resume.json';

const resume = () => {
	const { site, page, seo } = createMetaData(json);

	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<section id="resume-section">
				<ResumeSummary />
				<ResumeExperience />
				<ResumeProjects />
				<ResumeKeySkills />
				<ResumeEducation />
			</section>
		</MainLayout>
	);
};

export default resume;
