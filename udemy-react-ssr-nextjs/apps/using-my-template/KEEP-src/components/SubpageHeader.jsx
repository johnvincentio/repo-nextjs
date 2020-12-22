//

import React from 'react';

import { pageMetaDataType } from '../types';

const SubpageHeader = ({ page }) => {
	const subtitle = page.subtitle.length > 0;
	const subsubtitle = page.subsubtitle.length > 0;
	return (
		<section id="subpage-header">
			<div className="container">
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
						<div className="block">
							<h1 className="animated fadeInUp">{page.title}</h1>
							{subtitle && <p className="animated fadeInUp">{page.subtitle}</p>}
							{subsubtitle && <p className="animated fadeInUp">{page.subsubtitle}</p>}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

SubpageHeader.propTypes = {
	page: pageMetaDataType.isRequired,
};

export default SubpageHeader;
