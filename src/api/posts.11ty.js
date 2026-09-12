// Read-only content API. Served as a static file, so it needs no server and
// inherits GitHub Pages' `access-control-allow-origin: *` for cross-origin use.
export default class {
	data() {
		return {
			permalink: "/api/posts.json",
			eleventyExcludeFromCollections: true,
		};
	}

	render({ collections, site }) {
		const posts = collections.posts.map((post) => ({
			title: post.data.title,
			date: post.date.toISOString().slice(0, 10),
			description: post.data.description ?? "",
			path: post.url,
			url: new URL(post.url, site.url).href,
		}));

		return JSON.stringify(
			{
				title: site.title,
				description: site.description,
				home: site.url,
				feed: `${site.url}/feed.xml`,
				generated: new Date().toISOString(),
				count: posts.length,
				posts,
			},
			null,
			"\t",
		);
	}
}
