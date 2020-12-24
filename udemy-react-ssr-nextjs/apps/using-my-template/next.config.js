//

// const path = require('path');

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

console.log('*** process.env.JV_MODE ', process.env.JV_MODE);

module.exports = withPWA({
	trailingSlash: true,
	pwa: {
		dest: 'public',
		disable: process.env.JV_MODE !== 'production',
		runtimeCaching,
		publicExcludes: []
	},
	env: {
		JV_MODE: process.env.JV_MODE,
		SERVER_URL: `https://www.apis.johnvincent.io/api/token`,
		API_KEY: `kdjgb0ertgw48u59ksbkluois.nluoe,4wo/e$@nuvz;ogj;ri`
	}

	// sassOptions: {
	// 	includePaths: [path.join(__dirname, 'styles')],
	// }
	// webpack: (config, { isServer }) => {
	// 	if (isServer) {
	// 		require('./src/scripts/sitemap');
	// 		require('./src/scripts/rss');
	// 	}
	// 	return config;
	// }
})
