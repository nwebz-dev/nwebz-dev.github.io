// Gallery manifest. Order matches src/_data/imageOrder.json.
export default class {
	data() {
		return {
			permalink: "/api/images.json",
			eleventyExcludeFromCollections: true,
		};
	}

	render({ images, site }) {
		const photos = images.map((image) => ({
			caption: image.caption,
			path: image.url,
			url: new URL(image.url, site.url).href,
		}));

		return JSON.stringify(
			{
				title: site.title,
				home: site.url,
				generated: new Date().toISOString(),
				count: photos.length,
				photos,
			},
			null,
			"\t",
		);
	}
}
