

const { JV_MODE } = process.env;
console.log(`*** JV_MODE `, JV_MODE);

const pathPrefix = `/`;

const canonicalDomain = `https://www.johnvincent.io`;
const canonicalUrl = `${canonicalDomain}`;

let siteUrl = ``;
if (JV_MODE === `development`) {
	siteUrl = `http://localhost:3200`;
} else if (JV_MODE === `local_production`) {
	siteUrl = `http://localhost:3225`;
} else {
	siteUrl = `https://www.nextjs.johnvincent.io`;
}
const baseUrl = `${siteUrl}${pathPrefix}`;

const externalUrls = [
	// `https://www.music.johnvincent.io`,
	// `https://www.mygithub.johnvincent.io`,
	// `https://www.rijksmuseum.johnvincent.io`,
	// `https://www.internet-resources.johnvincent.io`,
	// `https://www.peg-solitaire.johnvincent.io`,
	`https://www.omnifood.johnvincent.io`,
];

const config = {
	product: `John Vincent`,

	metaTitle: `John Vincent`,
	metaDescription: `John Vincent, Architect and Full Stack Developer`,
	metaKeywords: `johnvincentio, John Vincent, Architect, JavaScript, PWA, Full Stack, React, Node, Express, Redux, Java`,
	author: `John Vincent`,

	email: `john@johnvincent.io`,

	siteUrl,
	baseUrl,

	siteLanguage: `en`,
	locale: `en_US`,

	logo: `logo/johnvincent.png`, // Used for SEO

	fbAppId: `254081978475478`,

	facebookUsername: `johnvincentio`,
	twitterUsername: `johnvincentio`,
	githubUsername: `johnvincentio`,
	linkedinUrl: `https://linkedin.johnvincent.io`,
	angelUsername: `john-vincent-io`,
	googleProfile: `https://plus.google.com/107711732062970686024`,

	image: `images/john-vincent.jpg`,

	googleSiteVerification: `t541b51i2vyIyUl2NSxJvc46YwyLrUSRMuWmJcz2UzI`,

	seoFeed: `${siteUrl}${pathPrefix}feed.xml`,

	disqusShortname: `johnvincent-io`,
};

export default {
	buildTime: '',
	siteMetadata: {
		siteUrl, // required for sitemap plugin
		pathPrefix, // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
		canonicalUrl,	// required for canonical tag

		config: { ...config },
		other: {
			formspreeEmail: `https://formspree.io/f/xdoplylg`,
			googleMapsKey: `AIzaSyCSFbe-TedTXunuwrt51PEipjwPwCCgUfU`,
		}
	}
};
