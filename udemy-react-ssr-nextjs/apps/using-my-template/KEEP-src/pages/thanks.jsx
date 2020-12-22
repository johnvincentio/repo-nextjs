//

import React from 'react';

import MainLayout from '../components/MainLayout';

import SubpageHeader from '../components/SubpageHeader';
import CallToAction from '../components/CallToAction';

import createMetaData from '../lib/createMetaData';

import json from '../data/pages/thanks.json';

const thanks = () => {
	const { site, page, seo } = createMetaData(json);
	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<section id="thanks-section">
				<div className="container">
					<div className="thanks-outer">
						<div className="thanks-inner">
							<h4>Thank you for your interest</h4>
							<p>I will reply shortly</p>
						</div>
					</div>
				</div>
			</section>
			<CallToAction />
		</MainLayout>
	);
};

export default thanks;
