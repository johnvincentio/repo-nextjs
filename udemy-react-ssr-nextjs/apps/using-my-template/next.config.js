//

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
		JV_MODE: process.env.JV_MODE
	}
	// webpack: (config, { isServer }) => {
	// 	if (isServer) {
	// 		require('./src/scripts/sitemap');
	// 		require('./src/scripts/rss');
	// 	}
	// 	return config;
	// }
})
