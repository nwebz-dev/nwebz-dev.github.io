#!/usr/bin/env python3
"""Copy opt-in Obsidian notes from a local vault into src/notes/.

The vault lives outside this repo and never leaves your machine — CI only ever
sees what this script writes. Publishing is opt-in: a note is copied only if
its frontmatter contains `publish: true`. Anything else is ignored, so a new
note is private by default.

    python3 scripts/publish-notes.py            # publish
    python3 scripts/publish-notes.py --dry-run  # show what would happen

Override the vault location with VAULT=/some/path.
"""

import argparse
import os
import pathlib
import re
import shutil
import sys

VAULT = pathlib.Path(os.environ.get("VAULT", "~/Documents/vaults/exo-cortex")).expanduser()
OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "notes"

# Directories that never publish, whatever their frontmatter says.
SKIP_DIRS = {".obsidian", "Templates", "Excalidraw", ".trash"}

FRONTMATTER = re.compile(r"\A---\n(.*?)\n---\n?", re.S)
WIKILINK = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]")


def parse_frontmatter(text):
    """Return (fields, body). Minimal YAML — enough for flat key: value pairs."""
    match = FRONTMATTER.match(text)
    if not match:
        return {}, text

    fields = {}
    for line in match.group(1).splitlines():
        if not line.strip() or line.startswith("#") or line[:1].isspace():
            continue
        key, _, value = line.partition(":")
        if _:
            fields[key.strip()] = value.strip().strip("\"'")
    return fields, text[match.end():]


def slugify(name):
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug or "note"


def is_true(value):
    return str(value).strip().lower() in {"true", "yes", "1"}


def collect():
    """Walk the vault and split notes into published and skipped."""
    published, skipped = [], []

    for path in sorted(VAULT.rglob("*.md")):
        if SKIP_DIRS & set(path.relative_to(VAULT).parts):
            continue
        if path.name.endswith(".excalidraw.md"):
            continue

        fields, body = parse_frontmatter(path.read_text(encoding="utf-8"))
        if not is_true(fields.get("publish", "")):
            skipped.append(path.relative_to(VAULT))
            continue

        heading = re.search(r"^#\s+(.+)$", body, re.M)
        published.append({
            "path": path,
            "stem": path.stem,
            "slug": slugify(fields.get("slug") or path.stem),
            "title": fields.get("title") or (heading.group(1).strip() if heading else path.stem),
            "description": fields.get("description", ""),
            "date": fields.get("created", ""),
            "body": body,
        })

    return published, skipped


def rewrite_links(body, targets, unresolved):
    """Point wikilinks at published notes; unwrap the rest to plain text.

    Unwrapping avoids a dead link, but the target's name survives as text — so
    unresolved links are collected and reported rather than silently shipped.
    """
    def replace(match):
        target, alias = match.group(1).strip(), match.group(2)
        label = alias or target
        slug = targets.get(target.lower())
        if slug:
            return f"[{label}](/notes/{slug}/)"
        unresolved.add(target)
        return label

    return WIKILINK.sub(replace, body)


def escape(value):
    return str(value).replace("\\", "\\\\").replace('"', '\\"')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="report without writing")
    args = parser.parse_args()

    if not VAULT.is_dir():
        sys.exit(f"vault not found: {VAULT}")

    published, skipped = collect()
    targets = {note["stem"].lower(): note["slug"] for note in published}

    print(f"vault:  {VAULT}")
    print(f"output: {OUT}")
    print(f"\n{len(published)} to publish, {len(skipped)} skipped (no `publish: true`)\n")

    for note in published:
        print(f"  + {note['path'].relative_to(VAULT)}  ->  /notes/{note['slug']}/")
    for rel in skipped:
        print(f"  - {rel}")

    if args.dry_run:
        print("\ndry run — nothing written")
        return

    # Rebuild the directory so unpublished notes disappear from the site.
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    # Directory data file: shared layout, permalink and tag for every note.
    (OUT / "notes.json").write_text(
        '{\n\t"layout": "post.njk",\n\t"tags": ["notes"],\n'
        '\t"permalink": "/notes/{{ page.fileSlug }}/"\n}\n',
        encoding="utf-8",
    )

    unresolved = set()
    for note in published:
        front = [f'title: "{escape(note["title"])}"']
        if note["date"]:
            front.append(f'date: {note["date"]}')
        if note["description"]:
            front.append(f'description: "{escape(note["description"])}"')

        body = rewrite_links(note["body"], targets, unresolved).strip()
        # The title becomes the page heading, so drop a duplicate h1.
        body = re.sub(r"\A#\s+.+?\n+", "", body)

        (OUT / f"{note['slug']}.md").write_text(
            "---\n" + "\n".join(front) + "\n---\n\n" + body + "\n",
            encoding="utf-8",
        )

    print(f"\nwrote {len(published)} note(s) to {OUT}")

    if unresolved:
        print("\nwarning: wikilinks to unpublished notes were flattened to plain")
        print("text. The note names below now appear in published pages:")
        for name in sorted(unresolved):
            print(f"  {name}")
        print("Edit the source notes if those names should not be public.")

    print("\nreview with `git status`, then commit.")


if __name__ == "__main__":
    main()
