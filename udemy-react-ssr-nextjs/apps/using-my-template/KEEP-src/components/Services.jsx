//

import React from 'react';

import { IoIosLeaf, IoMdGlobe } from 'react-icons/io';
import { GiRingedPlanet } from 'react-icons/gi';
import { FaJava } from 'react-icons/fa';

const Services = () => (
	<section id="services">
		<div className="container">
			<div className="row">
				<div className="section-title">
					<h2>Services</h2>
					<p>
						A highly motivated, result driven Architect and Lead Developer with 20+ years of experience helping
						businesses identify challenges/opportunities and develop practical solutions through the use of technology.
					</p>
					<p>
						Passionate about all things Internet, I enjoy working in all roles and with all technologies to keep things
						interesting, including the following:
					</p>
				</div>
			</div>

			<div className="row service-items">
				<div className="service-item">
					<IoIosLeaf />
					<h3>Full Stack Development</h3>
					<p>
						Extensive Full Stack application architecture, design and development using HTML5, CSS3, SASS, PWA, React,
						Redux, Gatsby, Nextjs, Material UI, NodeJS, ExpressJS, MongoDB etc.
					</p>
				</div>
				<div className="service-item">
					<IoMdGlobe />
					<h3>Software Architect</h3>
					<p>
						Extensive experience in the development of architectural frameworks/patterns, application integration,
						processes, standards, and guidelines.
					</p>
				</div>
				<div className="service-item">
					<FaJava />
					<h3>JEE / Java</h3>
					<p>
						Extensive experience in the analysis, design, development, and implementation of large-scale high
						transaction and high-performance JEE Architecture systems.
					</p>
				</div>
				<div className="service-item">
					<GiRingedPlanet />
					<h3>Leadership</h3>
					<p>
						Extensive experience in the development and deployment of highly-complex state-of-the-art software
						solutions.
					</p>
				</div>
			</div>
		</div>
	</section>
);

export default Services;
