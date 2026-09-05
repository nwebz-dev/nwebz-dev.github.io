export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/img");

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
