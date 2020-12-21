//

/* eslint-disable react/no-danger */

import React from 'react';
import ReactMarkdown from "react-markdown/with-html";

import Link from 'next/link';

import { FaRegClock, FaChevronRight } from 'react-icons/fa';

const BlogList = ({ site, pageData }) => {
	// console.log('BlogList; pageData ', pageData, ' site ', site);
	const { author } = site.siteMetadata.config;
	return (
		<>
			{pageData.posts.map((post, index) => {
				const {
					id, fields, frontmatter, excerpt, html
				} = post.node;
				// console.log('post ', post);
				return (
					<div key={id}>
						<h2>
							<Link href={frontmatter.permalink}><a>{frontmatter.title}</a></Link>
						</h2>
						<p className="lead">
							{'by '}
							{author}
						</p>
						<p>
							<FaRegClock className="blog-icon" />
							<span>
								{' Posted on '}
								<time>{fields.postDate}</time>
							</span>
						</p>

						{/* <div dangerouslySetInnerHTML={{ __html: excerpt }} /> */}
						<div>
							<ReactMarkdown escapeHtml={false} source={excerpt} />
						</div>
	
						<Link href={frontmatter.permalink}>
							<a className="btn btn-primary">
								Read More
								<FaChevronRight className="chevron-icon" />
							</a>
						</Link>

						<hr />
					</div>
				);
			})}
		</>
	);
};

export default BlogList;
