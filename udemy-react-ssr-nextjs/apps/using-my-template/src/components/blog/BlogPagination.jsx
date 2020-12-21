//

/* eslint-disable no-plusplus */

import React from 'react';

// import { Link } from 'gatsby';

import Link from 'next/link';

import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const BlogPagination = ({ pageData }) => {
	// console.log('BlogPagination; pageData ', pageData);
	const { currentPage, pagesTotal } = pageData.page;
	if (pagesTotal === 1) {
		return '';
	}

	const prevUrl = currentPage > 2 ? `/blog/page${currentPage - 1}/` : '/blog/';
	const nextUrl = `/blog/page${currentPage + 1}/`;
	// console.log('prevUrl ', prevUrl, ' nextUrl ', nextUrl);

	const arr = [];
	for (let i = 1; i <= pagesTotal; i++) {
		let item = '';
		if (i === currentPage) {
			item = (
				<span key={i} className="webjeda">
					{i}
				</span>
			);
		} else if (i === 1) {
			item = (
				<Link key={i} href="/blog/">
					<a>{i}</a>
				</Link>
			);
		} else {
			const url = `/blog/page${i}/`;
			item = (
				<Link key={i} href={url}>
					<a>{i}</a>
				</Link>
			);
		}
		arr.push(item);
	}
	return (
		<div className="pagination">
			{currentPage > 1 && (
				<Link href={prevUrl}>
					<a>
						<FaAngleDoubleLeft className="arrow-left-icon" />
						Prev
					</a>
				</Link>
			)}

			{arr.map((item) => item)}

			{currentPage < pagesTotal && (
				<Link href={nextUrl}>
					<a>
						Next
						<FaAngleDoubleRight className="arrow-right-icon" />
					</a>
				</Link>
			)}
		</div>
	);
};

export default BlogPagination;
