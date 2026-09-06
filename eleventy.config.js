export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/img");
	// Custom domain for GitHub Pages. Must be in the built output, or each
	// deploy overwrites the Pages domain setting.
	eleventyConfig.addPassthroughCopy("src/CNAME");

	// The gallery is built from a directory listing in _data/images.js, which
	// Eleventy can't see as a dependency. Without this, adding or removing a
	// photo leaves the served page stale until the dev server restarts.
	eleventyConfig.addWatchTarget("src/img/", { resetConfig: true });

	eleventyConfig.addFilter("readableDate", (value) =>
		new Date(value).toLocaleDateString("en-GB", {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		}),
	);

	eleventyConfig.addFilter("isoDate", (value) =>
		new Date(value).toISOString().slice(0, 10),
	);

	eleventyConfig.addCollection("posts", (collection) =>
		collection.getFilteredByGlob("src/posts/*.md").reverse(),
	);

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			data: "_data",
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
}
