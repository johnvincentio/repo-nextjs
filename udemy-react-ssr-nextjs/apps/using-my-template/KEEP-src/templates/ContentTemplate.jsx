//

import React from 'react';

import {
	MainLayout, SubpageHeader, ArticleLayout, createMetaData,
} from '../components';

import { dataContentMarkdownRemarkType } from '../types';

const ContentTemplate = (props) => {
	// console.log('ContentTemplate; props ', props);
	const { data } = props;
	const { frontmatter: json } = data;
	json.type = 'article'; // override type for schema.org

	const { site, page, seo } = createMetaData(json);
	// console.log('site ', site, ' page ', page, ' seo ', seo);

	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<ArticleLayout html={data.html} />
		</MainLayout>
	);
};

ContentTemplate.propTypes = {
	data: dataContentMarkdownRemarkType.isRequired,
};

export default ContentTemplate;

// export const query = graphql`
// 	query($slug: String!) {
// 		markdownRemark(fields: { slug: { eq: $slug } }) {
// 			id
// 			html
// 			frontmatter {
// 				meta_title
// 				meta_description
// 				meta_keywords

// 				title
// 				subtitle
// 				subsubtitle

// 				permalink
// 			}
// 			fields {
// 				slug
// 				type
// 				suburl
// 				permalink
// 			}
// 		}
// 	}
// `;
