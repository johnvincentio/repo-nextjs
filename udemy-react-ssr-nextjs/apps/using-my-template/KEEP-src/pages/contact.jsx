//

import React from 'react';

import {
	MainLayout, SubpageHeader, createMetaData, ContactForm, GoogleMaps,
} from '../components';

import json from '../data/pages/contact.json';

const contact = () => {
	const { site, page, seo } = createMetaData(json);
	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<section id="contact-section">
				<div className="container">
					<div className="contact-outer">
						<ContactForm site={site} />
						<GoogleMaps site={site} />
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default contact;
