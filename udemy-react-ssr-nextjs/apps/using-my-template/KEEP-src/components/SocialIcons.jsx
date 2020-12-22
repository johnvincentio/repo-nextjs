//

import React from 'react';

import {
	FaRegEnvelope, FaGoogle, FaLinkedinIn, FaTwitter, FaFacebookF, FaAngellist, FaRss,
} from 'react-icons/fa';

import { siteType } from '../types';

const SocialIcons = ({ site }) => {
	// console.log('SocialIcons; site ', site);
	const {
		siteMetadata: { config },
	} = site;

	const mailToUrl = `mailto:${config.email}?Subject=Hello`;
	const twitterUrl = `https://twitter.com/${config.twitterUsername}`;
	const facebookURL = `https://facebook.com/${config.facebookUsername}`;
	const angelUrl = `https://www.angel.co/${config.angelUsername}`;
	const rssFeed = `${config.siteUrl}/feed.xml`;
	return (
		<div className="social-icons">
			<ul>
				<li>
					<a href={mailToUrl} target="_top" title="Email John Vincent">
						<FaRegEnvelope />
					</a>
				</li>
				<li>
					<a
						href={config.googleProfile}
						target="_blank"
						title="Contact John Vincent at Google"
						rel="noopener noreferrer"
					>
						<FaGoogle />
					</a>
				</li>
				<li>
					<a
						href={config.linkedinUrl}
						target="_blank"
						title="Contact John Vincent at Linkedin"
						rel="noopener noreferrer"
					>
						<FaLinkedinIn />
					</a>
				</li>
				<li>
					<a href={twitterUrl} target="_blank" title="Contact John Vincent at Twitter" rel="noopener noreferrer">
						<FaTwitter />
					</a>
				</li>
				<li>
					<a href={facebookURL} target="_blank" title="Contact John Vincent at Facebook" rel="noopener noreferrer">
						<FaFacebookF />
					</a>
				</li>
				<li>
					<a href={angelUrl} target="_blank" title="Contact John Vincent at AngelList" rel="noopener noreferrer">
						<FaAngellist />
					</a>
				</li>
				<li>
					<a href={rssFeed} target="_blank" title="RSS Feed" rel="noopener noreferrer">
						<FaRss />
					</a>
				</li>
			</ul>
		</div>
	);
};

SocialIcons.propTypes = {
	site: siteType.isRequired,
};

export default SocialIcons;
