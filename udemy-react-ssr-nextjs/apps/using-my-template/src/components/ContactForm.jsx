//

import React from 'react';

import { siteType } from '../types';

const ContactForm = ({ site }) => {
	// console.log('ContactForm; site ', site);
	const { formspreeEmail } = site.siteMetadata.other;

	const {
		siteMetadata: { config },
	} = site;
	const nextUrl = `${config.siteUrl}/thanks`;

	return (
		<div id="contact-form">
			<h2>Please fill out this form and I will get in touch with you shortly.</h2>

			<form action={formspreeEmail} method="POST">
				<div>
					<div className="block">
						<input type="hidden" name="_next" value={nextUrl} />
						<div className="form-group">
							<input type="text" name="name" className="form-control" placeholder="Your Name" aria-label="Your Name" />
						</div>
						<div className="form-group">
							<input
								type="email"
								name="email"
								className="form-control"
								placeholder="Email Address"
								aria-label="Your Email Address"
							/>
						</div>
						<div className="form-group">
							<input type="text" name="subject" className="form-control" placeholder="Subject" aria-label="Subject" />
						</div>

						<div className="form-group-2">
							<textarea
								className="form-control"
								name="message"
								rows="3"
								placeholder="Your Message"
								aria-label="Your Message"
							/>
						</div>
						<button className="btn btn-default" type="submit">
							Send Message
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

ContactForm.propTypes = {
	site: siteType.isRequired,
};

export default ContactForm;
