//

const globby = require("globby");
const prettier = require("prettier");

const libs = require("./libs");

const getDate = new Date().toISOString();

const MY_DOMAIN = "https://nextjs.johnvincent.io";

const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
	const pages = await globby([
		// include
		"src/pages/**/*.jsx",
		// exclude
		"!src/pages/_app.jsx",
		"!src/pages/\\[...slug\\].jsx",
		"!src/pages/404.jsx",
		"!src/pages/thanks.jsx"
	]);
	// console.log('pages ', pages);

	const posts = libs.createPosts().sort((a, b) => (a.frontmatter.permalink > b.frontmatter.permalink) ? 1 : -1);

	const pagesSitemap = `
    ${pages
		.map(page => {
			const pathname = page
				.replace("src/pages/", "")
				.replace(".jsx", "")
				.replace(/\/index/g, "");
			const routePath = pathname === "index" ? "" : pathname;
			return `<url>
            <loc>${MY_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`;
		})
		.join("")}
  `;

	const postsSitemap = `
	${posts
		.map(post => {
			return `<url>
					<loc>${MY_DOMAIN}${post.frontmatter.permalink}</loc>
					<lastmod>${new Date(post.mtime).toISOString()}</lastmod>
				</url>`;
		})
		.join("")}
`;

	const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
			${pagesSitemap}
			${postsSitemap}
    </urlset>`;

	const formattedSitemap = [formatted(generatedSitemap)];
	libs.writeSitemap(formattedSitemap);
})();
