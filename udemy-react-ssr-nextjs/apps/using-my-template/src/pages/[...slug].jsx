//

import React from 'react';

import BlogPostTemplate from '../templates/BlogPostTemplate';
import ContentTemplate from '../templates/ContentTemplate';
import BlogTemplate from '../templates/BlogTemplate';

import getAll from '../lib/posts';
import capitalize from '../lib/utils';

export default function Page({ page, pageData, type }) {
	if (!page) {
		return null;
	}
	if (type === 'blogPost') return (
		<BlogPostTemplate data={page.node} pageData={pageData} />
	);
	if (type === 'content') return (
		<ContentTemplate data={page.node} />
	);
	if (type === 'blogPage') return (
		<BlogTemplate pageData={pageData} />
	)
	return null;
}

export async function getStaticPaths() {
	const { posts, content, blogPageData } = getAll();

	const postPaths = posts.map(post => {
		const slug = post.node.fields.permalink.split('/').slice(1);
		return { params: { slug } };
	});
	const contentPaths = content.map(post => {
		const slug = post.node.fields.permalink.split('/').slice(1);
		return { params: { slug } };
	});
	const blogPagePaths = blogPageData.pageData.map(item => {
		const slug = item.path.split('/').slice(1);
		return { params: { slug } };
	})
	return {
		paths: [ ...postPaths, ...contentPaths, ...blogPagePaths],
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const { posts, content, blogPageData, categories } = getAll();
	const currentPath = `/${params.slug.join('/')}/`;

	const idx1 = posts.findIndex(item => item.node.fields.permalink === currentPath);
	if (idx1 > -1) {
		const page = posts[idx1];

		const prevNode = idx1 === 0 ? null : posts[idx1 - 1].node;
		const nextNode = idx1 === posts.length - 1 ? null : posts[idx1 + 1].node;
	
		const pageCategories = {};
		page.node.frontmatter.category
			.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
			.forEach((arrayItem) => {
				const category = capitalize(arrayItem.toLowerCase());
				const value = categories[category];
				pageCategories[category] = value;
			});
		return { props: 
			{ page, type: 'blogPost', pageData: {	prevNode, nextNode, categories: pageCategories } }
		};
	}

	const idx2 = content.findIndex(item => item.node.fields.permalink === currentPath);
	if (idx2 > -1) {
		return { props: { page: content[idx2], type: 'content' } };
	}

	const idx3 = blogPageData.pageData.findIndex(item => item.path === currentPath);
	if (idx3 > -1) {
		const blogPage = blogPageData.pageData[idx3];
		const pagePosts = posts.slice(blogPage.from, blogPage.to);
		const { pagesTotal } = blogPageData;
		const { currentPage } = blogPage;
		return { props: 
			{ page: {},
				type: 'blogPage', 
				pageData: { 
					posts: pagePosts,
					categories, 
					page: { currentPage, pagesTotal }
				}
			}
		};
	}
	return { props: { page: { notfound: true }, type: '' } };
}
