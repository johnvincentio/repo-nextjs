//

import React from 'react';

import Link from 'next/link';

import content from '../data/content/call-to-action.json';

const CallToAction = () => {
	// console.log('CallToAction; content ', content);
	return (
		<section id="call-to-action">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="block">
							<h2>{content.title}</h2>
							<p>{content.text}</p>
							<Link href="/contact">
								<a className="btn btn-default btn-call-to-action">{content.tell_me}</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CallToAction;
