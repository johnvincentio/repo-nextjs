//

/* eslint-disable react/no-danger */

import React from 'react';

import Link from 'next/link';

import ReactMarkdown from "react-markdown/with-html";

import { FaRegClock, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import { DiscussionEmbed } from 'disqus-react';

import { BlogCategoriesWithBlogs } from '../components/blog';

import { siteType, pageMetaDataType, blogMarkdownRemarkType } from '../types';

const BlogPostLayout = (props) => {
	// console.log('BlogPostLayout; props ', props);
	const {
		site, page, markdownRemark, pageData,
	} = props;
	const { prevNode, nextNode } = pageData;
	// console.log('BlogPostLayout; site ', site, ' page ', page);
	// console.log('BlogPostLayout; markdownRemark ', markdownRemark);
	// console.log('prevNode ', prevNode);
	// console.log('nextNode ', nextNode);

	const { config } = site.siteMetadata;
	const { fields, frontmatter, html } = markdownRemark;

	const disqusShortname = `${config.disqusShortname}`;
	const disqusUrl = `${config.siteUrl}${markdownRemark.fields.slug}`;
	const disqusConfig = {
		identifier: markdownRemark.id,
		title: page.title,
		url: disqusUrl,
	};
	// console.log('disqusShortname ', disqusShortname);
	// console.log('disqusConfig ', disqusConfig);

	return (
		<article id="post">
			<div className="container">
				<div className="row">
					{/* <!-- Blog Post Content Column --> */}
					<div className="col-lg-8">
						{/* <!-- Blog Post --> */}
						{/* <!-- Title --> */}
						<h1>{page.title}</h1>
						{/* <!-- Author --> */}
						<p className="lead">
							{'by '}
							{config.author}
						</p>
						<hr />
						{/* <!-- Date/Time --> */}
						<p>
							<FaRegClock className="blog-icon" />
							{' Posted on '}
							{fields.postDate}
						</p>
						<hr />

						{/* <!-- Post Content --> */}
						{frontmatter.lead && <p className="lead">{frontmatter.lead}</p>}

						<div>
							<ReactMarkdown escapeHtml={false} source={html} />
						</div>

						{/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}

						{prevNode && (
							<span className="previous-link">
								<Link rel="prev" href={prevNode.fields.slug}>
									<a>
										<FaAngleDoubleLeft className="arrow-left-icon" />
										{prevNode.frontmatter.title}
									</a>
								</Link>
							</span>
						)}
						{nextNode && (
							<span className="next-link pull-right">
								<Link rel="next" href={nextNode.fields.slug}>
									<a>
										{nextNode.frontmatter.title}
										<FaAngleDoubleRight className="arrow-right-icon" />
									</a>
								</Link>
							</span>
						)}
						<hr />
						<DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
						<hr />
					</div>

					<div className="col-lg-8">
						<BlogCategoriesWithBlogs pageData={pageData} />
					</div>
				</div>
				{/* <!-- /.row --> */}
			</div>
		</article>
	);
};

BlogPostLayout.propTypes = {
	site: siteType.isRequired,
	page: pageMetaDataType.isRequired,
	markdownRemark: blogMarkdownRemarkType.isRequired,
};

export default BlogPostLayout;
