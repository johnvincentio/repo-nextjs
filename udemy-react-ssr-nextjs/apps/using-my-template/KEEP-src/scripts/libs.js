//

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// console.log(matter(string, {excerpt_separator: '<!-- end -->'}));

const libs = {

	walk(dir) {
		let results = [];
		const list = fs.readdirSync(dir);
		list.forEach(file => {
			// console.log('file ', file);
			if (file !== ".DS_Store") {
				const pathname = `${dir  }/${  file}`;
				const stat = fs.statSync(pathname);
				if (stat && stat.isDirectory()) { 
					results = results.concat(this.walk(pathname));
				} else {
					const mtime = (new Date(stat.mtime).getTime());
					results.push({
						file,
						pathname,
						name: file.slice(0, -3),
						mtime
					});
				}
			}
		});
		return results;
	},

	splitter(str) {
		// const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2})$/);
		// const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2})(.+)$/);
		// const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2}-)(.+)$/);
		const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2})-(.+)$/);
		return result;
	},

	handleExcerpt(file, options) {
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
	},

	createPosts() {
		const jv = path.join(__dirname, '..', '/markdown/blogs');
		// console.log('jv ', jv);
	
		const results = libs.walk(jv);
		// console.log('results ', results);
		const posts = results.map(({ pathname, name, mtime }, index) => {
			// console.log('post.pathname ', post.pathname);
			const markdownWithMetadata = fs.readFileSync(`${pathname}`).toString();
			// console.log('markdownWithMetadata ', markdownWithMetadata);
	
			const { content, data, excerpt } = matter(markdownWithMetadata, { excerpt: this.handleExcerpt });
	
			const [, dateString] = this.splitter(name);
	
			const modifiedTime = new Date(`${dateString} 14:30:00`).getTime();
			const postDate = (new Date(`${dateString} 14:30:00`).toUTCString());

			// console.log('dateString ', dateString, ' modifiedTime ', modifiedTime);
			// console.log('data ', data);
			return {
				html: content,
				frontmatter: data,
				excerpt,

				mtime,		// file date/time

				modifiedTime,	// from the .md file
				postDate
			};
		});
		return posts
	},

	writeSitemap(formattedSitemap) {
		const file = path.join(__dirname, '..', '..', '/public', '/sitemap.xml');
		console.log('sitemap', file);
	
		fs.writeFileSync(file, formattedSitemap, "utf8");
	},

	writeRssFeed(formattedFeed) {
		const file = path.join(__dirname, '..', '..', '/public', '/feed.xml');
		console.log('rssfeed', file);
	
		fs.writeFileSync(file, formattedFeed, "utf8");
	}
}

module.exports = libs;
