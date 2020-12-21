//

/* eslint-disable react/no-danger */

import React from 'react';

import ReactMarkdown from 'react-markdown/with-html';

import PropTypes from 'prop-types';

const ArticleLayout = ({ html }) => (
	<section id="article-page">
		<div className="container">
			<div className="row">
				<div className="col-md-10 col-md-offset-1 col-sm-12">
					<div className="block">
						<div>
							<ReactMarkdown escapeHtml={false} source={html} />
						</div>
						{/* {children} */}
					</div>
				</div>
			</div>
		</div>
	</section>
);

ArticleLayout.propTypes = {
	html: PropTypes.string.isRequired,
	// children: PropTypes.node.isRequired,
};

export default ArticleLayout;
