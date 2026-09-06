import fs from "node:fs";
import path from "node:path";

const dir = "src/img";
const orderFile = "src/_data/imageOrder.json";
const extensions = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"]);

// "epson-rd1_front.jpg" -> "Epson rd1 front"
function captionFrom(file) {
	const base = path.basename(file, path.extname(file)).replace(/[-_]+/g, " ").trim();
	return base.charAt(0).toUpperCase() + base.slice(1);
}

// Filenames listed in imageOrder.json lead, in that order. Anything not
// listed follows alphabetically, so a newly dropped photo still shows up.
function order(files) {
	if (!fs.existsSync(orderFile)) {
		return files.sort();
	}

	const wanted = JSON.parse(fs.readFileSync(orderFile, "utf8"));
	const present = new Set(files);

	const missing = wanted.filter((file) => !present.has(file));
	if (missing.length) {
		console.warn(`[images] listed in imageOrder.json but not in ${dir}: ${missing.join(", ")}`);
	}

	const listed = wanted.filter((file) => present.has(file));
	const rest = files.filter((file) => !wanted.includes(file)).sort();
	if (rest.length) {
		console.warn(`[images] not in imageOrder.json, appended at the end: ${rest.join(", ")}`);
	}

	return [...listed, ...rest];
}

export default function () {
	if (!fs.existsSync(dir)) {
		return [];
	}

	const files = fs
		.readdirSync(dir)
		.filter((file) => extensions.has(path.extname(file).toLowerCase()));

	return order(files).map((file) => ({
		url: `/img/${file}`,
		caption: captionFrom(file),
	}));
}
