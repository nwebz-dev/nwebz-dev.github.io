export default {
	title: "Nick Weber",
	description: "Notes on software, tooling, and whatever else.",
	author: "Nick Weber",
	url: "https://nwebz.co",
	social: {
		github: "https://github.com/nwebz-dev",
		linkedin: "https://www.linkedin.com/in/nick-weber-37a014a6",
		instagram: "https://www.instagram.com/fragile.styles",
		lichess: "https://lichess.org/@/nwebz",
		email: "nick@nwebz.co",
	},
	// `key` is matched against the WIP list in eleventy.config.js — a hidden
	// section drops out of the nav without its entry being deleted here.
	nav: [
		{ label: "About", url: "/about/", key: "about" },
		{ label: "Words", url: "/posts/", key: "posts" },
		{ label: "Images", url: "/images/", key: "images" },
		{ label: "CV", url: "/cv/", key: "cv" },
	],
};
