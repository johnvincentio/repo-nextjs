//

/* eslint-disable react/no-array-index-key */

import React from 'react';

import Link from 'next/link';

import { improveText } from '../../lib/utils';

const BlogCategoriesWithBlogs = ({ pageData }) => (
	// console.log('BlogCategoriesWithBlogs; pageData ', pageData);
	<div className="well">
		{Object.entries(pageData.categories).map((entry, index) => {
			const key = entry[0];
			const value = entry[1];

			const text = `${improveText(key, ' ')}`;
			const href = `${improveText(key, '_')}`;

			return (
				<div key={index}>
					<h3 id={href}>{text}</h3>
					<ul>
						{value.list.map((item, idx) => (
							<li key={idx}>
								<Link href={item.key}><a>{item.value}</a></Link>
							</li>
						))}
					</ul>
				</div>
			);
		})}
	</div>
);
export default BlogCategoriesWithBlogs;
