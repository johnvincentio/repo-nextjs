//

// https://github.com/leaffm/react-infinite-carousel

/* eslint-disable react/no-array-index-key */

import React from 'react';

import Loadable from 'react-loadable';
// import InfiniteCarousel from 'react-leaf-carousel';
import Loading from './Loading';

import { technologiesType } from '../types';

import content from '../data/content/technologies.json';

const LoadableComponent = Loadable({
	loader: () => import('react-leaf-carousel'),
	loading: Loading,
});

const Technologies = () => (
	<InnerTechnologies all={content.all} />
);

const InnerTechnologies = ({ all }) => (
	<section id="technologies-logo-section">
		<LoadableComponent
			responsive
			breakpoints={[
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 4,
					},
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 5,
					},
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 6,
					},
				},
				{
					breakpoint: 900,
					settings: {
						slidesToShow: 7,
					},
				},
				{
					breakpoint: 1100,
					settings: {
						slidesToShow: 8,
					},
				},
				{
					breakpoint: 1250,
					settings: {
						slidesToShow: 9,
					},
				},
			]}
			arrows={false}
			dots={false}
			showSides={false}
			sidesOpacity={0.5}
			// sideSize={0.1}
			slidesToScroll={1}
			slidesToShow={10}
			scrollOnDevice
			autoCycle
			cycleInterval={1000}
			// animationDuration={100}
			// paging
		>
			{all.map((service, index) => (
				<div key={index} className="technologies-logo-div tech-tooltip">
					<img src={service.image} alt={service.name} />
					<span className="tech-tooltiptext">{service.name}</span>
				</div>
			))}
		</LoadableComponent>
	</section>
);

InnerTechnologies.propTypes = {
	all: technologiesType.isRequired,
};

export default Technologies;
