---
title: Hello world
date: 2026-09-02
description: First post on the new site.
---

This site is built with [Eleventy](https://www.11ty.dev/) and deployed to GitHub
Pages by a GitHub Actions workflow on every push to `main`.

## Adding a post

Drop a markdown file in `src/posts/`. The front matter needs a `title` and a
`date`; everything else is optional.

```markdown
---
title: Something I learned
date: 2026-09-10
---

Content goes here.
```

The layout, permalink, and tag are applied automatically by
`src/posts/posts.json`, so there's no per-file boilerplate beyond those two
fields.

## Running it locally

```bash
npm start
```

That serves the site at `http://localhost:8080` with hot reload.
