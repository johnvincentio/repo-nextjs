//

import React from 'react';

import { pageMetaDataType } from '../types';

const Intro = ({ page }) => {
	const content = {};
	// const { contentIntroJson: content } = useStaticQuery(graphql`
	// 	query {
	// 		contentIntroJson {
	// 			intro_1
	// 			intro_2
	// 		}
	// 	}
	// `);

	return (
		<section id="intro">
			<div className="container">
				<div className="row text-center">
					<div className="col-md-10 col-md-offset-1">
						<div className="block">
							<h1 className="animated fadeInUp">{page.title}</h1>
							<p className="animated fadeInUp">
								{content.intro_1}
								<br />
								<br />
								{content.intro_2}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

Intro.propTypes = {
	page: pageMetaDataType.isRequired,
};

export default Intro;
