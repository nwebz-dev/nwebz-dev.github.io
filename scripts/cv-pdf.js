import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

// The built page asks for /css/style.css and /icon/*, so it can't be opened
// over file:// — those absolute paths would resolve against the filesystem
// root. A throwaway server on a random port is the smallest thing that works.
const TYPES = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".json": "application/json",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".webp": "image/webp",
	".gif": "image/gif",
	".ico": "image/x-icon",
};

function serve(root) {
	const server = http.createServer((req, res) => {
		const url = new URL(req.url, "http://127.0.0.1");
		let file = path.join(root, decodeURIComponent(url.pathname));
		if (file.endsWith(path.sep) || !path.extname(file)) {
			file = path.join(file, "index.html");
		}
		// Anything outside the build directory is a bug, not a request to honour.
		if (!path.resolve(file).startsWith(path.resolve(root))) {
			res.writeHead(403).end();
			return;
		}
		fs.readFile(file, (err, body) => {
			if (err) {
				res.writeHead(404).end();
				return;
			}
			res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
			res.end(body);
		});
	});

	return new Promise((resolve) => {
		server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
	});
}

export default async function buildCvPdf(outputDir) {
	const { server, port } = await serve(outputDir);
	let browser;

	try {
		browser = await chromium.launch();
	} catch (error) {
		server.close();
		throw new Error(
			`Could not launch Chromium for the CV PDF. Run:\n` +
				`  npx playwright-core install chromium --only-shell\n\n${error.message}`,
		);
	}

	try {
		const page = await browser.newPage();

		// The analytics beacon is the one outbound request on the page; letting it
		// run would make every build wait on a third party for nothing.
		await page.route("**/*", (route) =>
			new URL(route.request().url()).hostname === "127.0.0.1" ? route.continue() : route.abort(),
		);

		const response = await page.goto(`http://127.0.0.1:${port}/cv/`, { waitUntil: "load" });
		if (!response?.ok()) {
			throw new Error(`/cv/ returned ${response?.status()} from the build output`);
		}
		await page.evaluate(() => document.fonts.ready);

		// Page size and margins come from the @page rule in style.css, so the
		// printed layout has exactly one definition.
		await page.pdf({
			path: path.join(outputDir, "cv.pdf"),
			preferCSSPageSize: true,
			printBackground: false,
		});
	} finally {
		await browser.close();
		server.close();
	}
}
