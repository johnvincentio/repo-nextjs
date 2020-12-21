//

import fs from 'fs';
// import path from 'path';
import matter from 'gray-matter';

import { splitter, formatDate, calculateCategories } from './utils';

/* TODO; this must be static */
const POSTS_PER_PAGE = 69;

const STATIC_POSTS = createPosts();
const STATIC_CONTENT = createContent();
const STATIC_CATEGORIES = calculateCategories(STATIC_POSTS);
const STATIC_BLOG_PAGES = createBlogPages(STATIC_POSTS);

export default function getAll() {
	return {
		posts: STATIC_POSTS,
		content: STATIC_CONTENT,
		categories: STATIC_CATEGORIES,
		blogPageData: STATIC_BLOG_PAGES
	}
}

function createBlogPages(posts) {
	const totalBlogs = posts.length;
	const postsPerPage = POSTS_PER_PAGE;
	const pagesTotal = Math.ceil(totalBlogs / postsPerPage);
	// console.log('pagesTotal ', pagesTotal);

	const pageData = [];
	for (let i = 1; i <= pagesTotal; i++) {
		const from = (i - 1) * postsPerPage;
		const to = i * postsPerPage;
		// console.log('from ', from, ' to ', to);

		const path = i === 1 ? '/blog/' : `/blog/page${i}/`;
		pageData.push({
			path,
			from,
			to,
			currentPage: i,
		});
	}
	return {
		totalBlogs,
		postsPerPage,
		pagesTotal,
		pageData
	}
}

function createPosts() {
	// console.log('createPosts');
	const results = walk(`${process.cwd()}/src/markdown/blogs`);
	const posts = results.map(({ path, name }, index) => {
		// console.log('path ', path);
		const markdownWithMetadata = fs.readFileSync(`${path}`).toString();
		// console.log('markdownWithMetadata ', markdownWithMetadata);

		const { content, data, excerpt } = matter(markdownWithMetadata, { excerpt: handleExcerpt });

		const [, dateString, title] = splitter(name);

		const modifiedTime = new Date(`${dateString} 14:30:00`).getTime();
		const postDate = formatDate(new Date(`${dateString} 14:30:00`));
		// console.log('data ', data);
		return {
			node: {
				id: `key_${index+1}`,
				html: content,
				frontmatter: data,
				excerpt,
				fields: {
					modifiedTime,
					permalink: data.permalink,
					postDate,
					slug: data.permalink,
					suburl: title.trim(),
					type: 'blog'
				}
			}
		};
	});
	// console.log('**** posts ', posts);
	return posts.sort(compare);
}

function createContent() {
	// console.log('createContent');
	const results = walk(`${process.cwd()}/src/markdown/content`);
	const posts = results.map(({ path, name, mtime }, index) => {
		// console.log('path ', path);
		const markdownWithMetadata = fs.readFileSync(`${path}`).toString();
		// console.log('markdownWithMetadata ', markdownWithMetadata);

		const { content, data } = matter(markdownWithMetadata);

		const postDate = formatDate(new Date(mtime));
		// console.log('postDate ', postDate);
		return {
			node: {
				// id: index + 1,
				html: content,
				frontmatter: data,
				fields: {
					modifiedTime: mtime,
					permalink: data.permalink,
					postDate,
					slug: data.permalink,
					suburl: name.trim()
				}
			}
		};
	});
	return posts;
}

function compare(a, b) {
	if (a.node.fields.modifiedTime < b.node.fields.modifiedTime) return 1;
	if (a.node.fields.modifiedTime > b.node.fields.modifiedTime) return -1;
	return 0;
}

function handleExcerpt(file, options) {
	const list = [];
	const lines = file.content.split('\n').slice(0, 20);
	let add = true;
	lines.every(line => {
		// console.log('line :',line,':');
		if (line === '<!-- end -->') add = false;
		if (add) list.push(line);
		return add;
	})
	file.excerpt = list.join('\n');
}

function walk(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach(file => {
		// console.log('file ', file);
		if (file !== ".DS_Store") {
			// const [, dateString, title] = splitter(file);
			// console.log('dateString ', dateString);
			// console.log('title ', title);
			const path = `${dir  }/${  file}`;
			const stat = fs.statSync(path);
			if (stat && stat.isDirectory()) { 
				results = results.concat(walk(path));
			} else {
				const mtime = (new Date(stat.mtime).getTime());
				results.push({
					file,
					path,
					name: file.slice(0, -3),
					mtime
				});
			}
		}
	});
	return results;
}
