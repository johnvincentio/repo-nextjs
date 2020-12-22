//

/* eslint-disable react/no-array-index-key */

import React from 'react';

// import { Link } from 'gatsby';

import Link from 'next/link';

import { improveText } from '../../lib/utils';

const BlogCategoriesWithCounts = ({ pageData }) => (
	// console.log('BlogCategoriesWithCounts; pageData ', pageData, ' site ', site);
	<div className="well">
		<h2>Categories</h2>
		<ul>
			{Object.entries(pageData.categories).map((entry, index) => {
				const key = entry[0];
				const value = entry[1];

				const text = `${improveText(key, ' ')} (${value.count})`;
				const href = `/blog/#${improveText(key, '_')}`;
				return (
					<li key={index}>
						<Link href={href}><a>{text}</a></Link>
					</li>
				);
			})}
		</ul>
	</div>
);
export default BlogCategoriesWithCounts;
