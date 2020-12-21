//

import React from 'react';

import Link from 'next/link';

import { siteType } from '../types';

import SocialIcons from './SocialIcons';

const Footer = ({ site }) => {
	const {
		siteMetadata: { config },
	} = site;

	return (
		<footer id="footer">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<SocialIcons site={site} />
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="footer-menu">
							<ul>
								<li>
									<a href="https://www.taskmuncher.com" target="_blank" rel="noopener noreferrer">
										Taskmuncher
									</a>
								</li>
								<li>
									<a href="https://www.feediator.com" target="_blank" rel="noopener noreferrer">
										Feediator
									</a>
								</li>
								<li>
									<a href={config.seoFeed} target="_blank" rel="noopener noreferrer">
										RSS Feed
									</a>
								</li>

								<li>
									<Link href="/privacy-policy/"><a>Privacy Policy</a></Link>
								</li>
								<li>
									<Link href="/terms-of-service/"><a>Terms of Service</a></Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	site: siteType.isRequired,
};

export default Footer;
