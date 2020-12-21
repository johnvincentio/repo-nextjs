//

/* eslint-disable react/no-array-index-key */

import React from 'react';

import Link from 'next/link';

import classnames from 'classnames';

import content from '../data/content/header.json';

import { siteType, pageMetaDataType, HeadersType } from '../types';

const Header = ({ site, page }) => (
	<InnerHeader header={content.header} site={site} page={page} />
);

Header.propTypes = {
	site: siteType.isRequired,
	page: pageMetaDataType.isRequired,
};

class InnerHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};
	}

	toggleNavbar = () => {
		this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
	};

	render() {
		const { site, page, header } = this.props;
		const {
			siteMetadata: { config },
		} = site;

		return (
			<header id="header">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<nav className="navbar navbar-default">
								<div className="container-fluid">
									<div className="navbar-header">
										<button type="button" className="navbar-toggle collapsed" onClick={this.toggleNavbar}>
											<span className="sr-only">Toggle navigation</span>
											<span className="icon-bar" />
											<span className="icon-bar" />
											<span className="icon-bar" />
										</button>
										<Link href="/">
											<a id="header--my-brand" className="navbar-brand">{config.product}</a>
										</Link>
									</div>

									<div className={classnames('navbar-collapse', this.state.collapsed && 'collapse')}>
										<ul className="nav navbar-nav navbar-right">
											{header.map((item, index) => (
												<li
													key={index}
													className={classnames('read-more-target', { active: page.permalink === item.url })}
												>
													<Link href={item.href}><a>{item.text}</a></Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

InnerHeader.propTypes = {
	site: siteType.isRequired,
	page: pageMetaDataType.isRequired,
	header: HeadersType.isRequired,
};

export default Header;
