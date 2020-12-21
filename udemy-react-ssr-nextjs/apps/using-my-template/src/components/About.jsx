//

import React from 'react';

import Image from 'next/image';

import about from '../data/content/about.json';

const About = () => {
	// console.log('about ', about);
	return (
		<main id="about">
			<div className="container">
				<div className="row">
					<div className="col-md-7 col-sm-12">
						<div className="block">
							<div className="section-title">
								<h2>{about.title}</h2>
								<p>{about.subtitle}</p>
							</div>
							{about.text.map((item) => (
								<p key={item.id}>{item.text}</p>
							))}
						</div>
					</div>
					<div className="about-image col-md-5 col-sm-12">
						<div className="block">
							{/* <Image src={about.image} alt={about.title} width="450" height="450" /> */}
							<img src={about.image} alt={about.title} /> 
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default About;
