//

/* eslint-disable react/no-array-index-key */

import React from 'react';

import { portfolioCategoriesType, portfolioProjectsType } from '../types';

import content from '../data/content/portfolio.json';

const Portfolio = () => (
	<InnerPortfolio projects={content.projects} categories={content.categories} />
);

class InnerPortfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentCategory: 0,
		};
	}

	onClickCategory = (category) => {
		this.setState({ currentCategory: category });
	};

	render() {
		// console.log('InnerPortfolio; props ', this.props);
		const { categories, projects } = this.props;
		return (
			<section id="portfolio-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							<div className="block">
								<div id="portfolio-menu">
									<ul>
										{categories.map((item) => (
											<li
												key={item.id}
												className={item.id === this.state.currentCategory ? 'filter active' : 'filter'}
												onClick={() => this.onClickCategory(item.id)}
												// onKeyDown={() => {}}
											>
												{item.title}
												<div className="portfolio-icon" />
											</li>
										))}
									</ul>
								</div>

								<div id="portfolio-content">
									{projects
										.filter(
											(project) => this.state.currentCategory === 0 || this.state.currentCategory === project.category,
										)
										.map((project, index) => (
											<div key={index} className="card-container">
												<div className="card">
													<div className="face front">
														<img src={project.img} alt={project.title} />
													</div>
													<div className="face back">
														<div className="card-text">
															<a href={project.url} target="_blank" rel="noopener noreferrer">
																<h2>{project.title}</h2>
																<p>{project.content}</p>
															</a>
														</div>
													</div>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

InnerPortfolio.propTypes = {
	projects: portfolioProjectsType.isRequired,
	categories: portfolioCategoriesType.isRequired,
};

export default Portfolio;

