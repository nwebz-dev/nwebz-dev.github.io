import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import markdownItFootnote from "markdown-it-footnote";
import buildCvPdf from "./scripts/cv-pdf.js";

// Sections that aren't ready for visitors. Their pages, feeds and API
// endpoints are left out of the build entirely — a redirect bolted onto a
// static host still ships the content, so "hidden" would only mean "one
// View Source away". Empty this array to publish everything again.
const WIP = ["posts"];

export default function (eleventyConfig) {
	// Templates read this to drop nav links and sections for hidden parts.
	eleventyConfig.addGlobalData("wip", WIP);

	if (WIP.includes("posts")) {
		// The stub at src/posts.njk still builds, so existing links to
		// /posts/ land on a note instead of a 404.
		eleventyConfig.ignores.add("src/posts/*.md");
		eleventyConfig.ignores.add("src/api/posts.11ty.js");
	}

	// Eleventy's markdown-it has no footnote support by default.
	eleventyConfig.amendLibrary("md", (md) => md.use(markdownItFootnote));

	if (!WIP.includes("posts")) {
		eleventyConfig.addPlugin(feedPlugin, {
			type: "atom",
			outputPath: "/feed.xml",
			collection: { name: "posts", limit: 20 },
			metadata: {
				language: "en",
				title: "Nick Weber",
				subtitle: "Notes on software, tooling, and whatever else.",
				base: "https://nwebz.co/",
				author: { name: "Nick Weber" },
			},
		});
	}

	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/img");
	// Kept out of src/img so the favicon does not land in the photo gallery,
	// which is built from a listing of that directory.
	eleventyConfig.addPassthroughCopy("src/icon");
	// Browsers and feed readers request /favicon.ico regardless of the link tags.
	eleventyConfig.addPassthroughCopy({ "src/icon/favicon.ico": "favicon.ico" });
	// Custom domain for GitHub Pages. Must be in the built output, or each
	// deploy overwrites the Pages domain setting.
	eleventyConfig.addPassthroughCopy("src/CNAME");

	// The gallery is built from a directory listing in _data/images.js, which
	// Eleventy can't see as a dependency. Without this, adding or removing a
	// photo leaves the served page stale until the dev server restarts.
	eleventyConfig.addWatchTarget("src/img/", { resetConfig: true });

	// /cv.pdf is printed from the built /cv/ page, so it can never drift from
	// cv.md. Skipped while serving — it costs a couple of seconds, and the dev
	// server would pay it on every keystroke. Run `npm run build` to refresh it.
	eleventyConfig.on("eleventy.after", async ({ dir, runMode }) => {
		if (runMode !== "build") {
			return;
		}
		await buildCvPdf(dir.output);
	});

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

	// Newest first. Templates iterate this directly — don't add `| reverse`.
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
