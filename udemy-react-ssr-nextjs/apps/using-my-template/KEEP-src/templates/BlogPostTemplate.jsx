//

import React from 'react';

import {
	MainLayout, SubpageHeader, BlogPostLayout, createMetaData,
} from '../components';

import { dataBlogMarkdownRemarkType } from '../types';

// pageData.categories
const BlogPostTemplate = (props) => {
	// console.log('BlogPostTemplate; props ', props);
	// console.log('--- BlogPostTemplate; data ', data);
	const { data, pageData } = props;
	// const { pageData } = props.pathContext;
	// const pageData = { categories };
	const { frontmatter: json } = data;
	// console.log('json ', json);
	json.type = 'article'; // override type for schema.org

	const { site, page, seo } = createMetaData(json);
	// console.log('site ', site, ' page ', page, ' seo ', seo);

	return (
		<MainLayout site={site} page={page} seo={seo}>
			<SubpageHeader page={page} />
			<BlogPostLayout site={site} page={page} markdownRemark={data} pageData={pageData} />
		</MainLayout>
	);
};

BlogPostTemplate.propTypes = {
	// data: dataBlogMarkdownRemarkType.isRequired,
};

export default BlogPostTemplate;

/*
export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			html
			excerpt
			frontmatter {
				meta_title
				meta_description
				meta_keywords

				title
				subtitle
				subsubtitle
				lead

				permalink

				category
			}
			fields {
				slug
				type
				modifiedTime
				postDate
				suburl
				permalink
			}
		}
	}
`;
*/
