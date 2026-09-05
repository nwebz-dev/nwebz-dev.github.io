# nwebz-dev.github.io

Personal site. [Eleventy](https://www.11ty.dev/) 3.x, no framework, plain CSS.

Live at <https://nwebz-dev.github.io>.

## Local development

```bash
npm install
npm start      # http://localhost:8080, hot reload
npm run build  # one-off build into _site/
```

## Structure

```
src/
├── _data/site.js       site title, description, nav
├── _includes/
│   ├── base.njk        page shell
│   └── post.njk        post layout
├── css/style.css       all styles
├── posts/
│   ├── posts.json      layout + permalink for every post
│   └── *.md            the posts
├── index.njk           home
├── posts.njk           post index
└── about.md
```

## Adding a post

Create `src/posts/my-post.md`:

```markdown
---
title: My post
date: 2026-09-10
---

Content.
```

Layout, tag, and permalink come from `src/posts/posts.json`. The post appears on
the home page and at `/posts/my-post/` automatically.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. Requires Pages source set to **GitHub Actions** in
repository settings.
