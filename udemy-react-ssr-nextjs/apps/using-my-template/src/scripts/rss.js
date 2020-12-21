//

const libs = require("./libs");

const MY_DOMAIN = "https://www.nextjs.johnvincent.io";

/*
<content:encoded>
	<![CDATA[${post.html}]]>
</content:encoded>
*/

(async () => {
	const posts = libs.createPosts().sort((a, b) => (a.modifiedTime > b.modifiedTime) ? -1 : 1);

	const postsFeed = `
	${posts
		.map(post => {
			const categories = post.frontmatter.category.map(cat => {
				return `<category>${cat}</category>\n`;
			}).join("");
			return `<item>
					<title><![CDATA[${post.frontmatter.title}]]></title>
					<link>${MY_DOMAIN}${post.frontmatter.permalink}</link>
					<description><![CDATA[${post.excerpt}]]></description>
					<pubDate>${post.postDate}</pubDate>
					<guid isPermaLink="true">${MY_DOMAIN}${post.frontmatter.permalink}</guid>
					${categories}
				</item>
			`;
		})
		.join("")}
`;

	const generatedFeed = `<?xml version="1.0" encoding="UTF-8"?>
		<rss
			xmlns:dc="http://purl.org/dc/elements/1.1/"
			xmlns:content="http://purl.org/rss/1.0/modules/content/"
			xmlns:atom="http://www.w3.org/2005/Atom"
			version="2.0"
		>
			<channel>
				<title><![CDATA[John Vincent Blog Feed]]></title>
				<description><![CDATA[John Vincent Blog Feed]]></description>
				<link>${MY_DOMAIN}</link>
				<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
				<atom:link href="${MY_DOMAIN}/feed.xml" rel="self" type="application/rss+xml"/>
				<generator>John Vincent Generator</generator>
				<managingEditor>other@johnvincent.io (John Vincent)</managingEditor>
				<webMaster>other@johnvincent.io (John Vincent)</webMaster>
				${postsFeed}
			</channel>
		</rss>
  `;

	libs.writeRssFeed(generatedFeed);
})();
