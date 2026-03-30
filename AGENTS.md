# AGENTS.md

This file provides guidance for agentic coding agents working in this repository.

## Project Overview

This is an academic personal website built with **Jekyll** using the **al-folio** theme.
It is deployed to GitHub Pages at `https://bonanzhu.com`. The site uses Liquid templating,
Markdown content files, BibTeX for publications, and SCSS for styling.

## Build & Development Commands

### Local Development (Docker - Recommended)

```bash
docker compose pull && docker compose up
```

The site is served at `http://localhost:8080`. Changes auto-reload.

### Local Development (Native Jekyll)

```bash
bundle install
bundle exec jekyll serve
```

Served at `http://localhost:4000`. Requires Ruby 3.3.5+ and ImageMagick installed.

### Production Build

```bash
export JEKYLL_ENV=production
bundle exec jekyll build
```

Output goes to `_site/`. This is what the GitHub Actions deploy workflow runs.

### Linting / Formatting (Prettier)

```bash
npx prettier . --check    # check formatting
npx prettier . --write     # auto-fix formatting
```

This is the only code-quality check. It runs in CI via `.github/workflows/prettier.yml`.
Prettier uses `@shopify/prettier-plugin-liquid` for `.liquid` files.

### Broken Links

```bash
# Checked via lychee in CI - see .github/workflows/broken-links-site.yml
```

### Testing

There are no automated tests. Verify changes by running the site locally and visually inspecting.

## Code Style Guidelines

### Prettier Configuration (`.prettierrc`)

- **Print width**: 150 characters
- **Trailing commas**: ES5
- **Plugin**: `@shopify/prettier-plugin-liquid` (handles `.liquid` files)

### File Types & Conventions

| File Type | Location                                                | Purpose                             |
| --------- | ------------------------------------------------------- | ----------------------------------- |
| `.md`     | `_posts/`, `_pages/`, `_news/`, `_projects/`, `_books/` | Content pages with YAML frontmatter |
| `.liquid` | `_layouts/`, `_includes/`                               | Templates and partials              |
| `.scss`   | `_sass/`                                                | Stylesheets                         |
| `.js`     | `assets/js/`, `_scripts/`                               | Client-side JavaScript              |
| `.bib`    | `_bibliography/`                                        | BibTeX publication entries          |
| `.yml`    | `_data/`, `_config.yml`                                 | Configuration and data files        |
| `.json`   | `assets/json/`                                          | Resume data (JSON Resume format)    |

### Markdown / Content Files

- Blog posts in `_posts/` must follow naming: `YYYY-MM-DD-title.md`
- All pages must have YAML frontmatter with at minimum `layout`, `title`, and `permalink`
- Available layouts: `default`, `page`, `post`, `about`, `cv`, `distill`, `archive`, `bib`, `profiles`, `book-review`, `book-shelf`, `none`

### Liquid Templates

- Layouts go in `_layouts/` with `.liquid` extension
- Reusable partials go in `_includes/` with `.liquid` extension
- Use `{% include filename.liquid %}` to include partials
- Use `{{ site.variable }}` for site config and `{{ page.variable }}` for frontmatter
- Use `{{ 'path' | relative_url }}` for internal links
- Use `{% if condition %}...{% endif %}` for conditionals

### SCSS / Styling

- Main style files: `_base.scss`, `_layout.scss`, `_distill.scss`, `_cv.scss`, `_themes.scss`, `_variables.scss`
- Theme colors defined in `_sass/_themes.scss`
- CSS variables used for light/dark mode switching
- Sass output style is `compressed` (set in `_config.yml`)

### JavaScript

- Custom JS goes in `assets/js/` or `_scripts/`
- Third-party libraries are loaded via CDN (configured in `_config.yml` under `third_party_libraries`)
- jQuery and Bootstrap are available globally

### BibTeX / Publications

- Publications go in `_bibliography/papers.bib`
- Supported custom fields: `abstract`, `altmetric`, `arxiv`, `award`, `bibtex_show`, `blog`, `code`, `dimensions`, `doi`, `html`, `pdf`, `poster`, `preview`, `selected`, `slides`, `supp`, `video`, `website`
- Mark selected papers with `selected = {true}`

### YAML Data Files

- `_data/socials.yml` - Social media links (alphabetically sorted)
- `_data/repositories.yml` - GitHub users/repos to display
- `_data/cv.yml` - CV data (fallback when `assets/json/resume.json` is absent)
- `_config.yml` - Main site configuration; changes require a rebuild

### General Conventions

- No test suite exists; verify visually
- All content changes should be on the `main` branch (deployment is automatic via GitHub Actions)
- The `gh-pages` branch is auto-generated - never edit it directly
- Social media entries in `_data/socials.yml` and related files must be alphabetically sorted
- External links should use `target="_blank"` and `rel="external nofollow noopener"`
- Image assets go in `assets/img/`; responsive WebP images are auto-generated by jekyll-imagemagick
- PDF files for publications go in `assets/pdf/`

## Key Configuration (`_config.yml`)

- `url`: `https://bonanzhu.com`
- `baseurl`: empty (root deployment)
- Markdown engine: `kramdown` with GFM input
- Syntax highlighter: `rouge`
- Sass style: `compressed`
- Pagination enabled for blog posts
- MathJax enabled for math typesetting
- Dark mode toggle enabled
- Publication badges: altmetric, dimensions, google_scholar, inspirehep

## CI/CD

- **Deploy** (`.github/workflows/deploy.yml`): Builds with `bundle exec jekyll build` on push to main, deploys `_site/` to `gh-pages` branch. Uses Ruby 3.3.5 and Python 3.13.
- **Prettier** (`.github/workflows/prettier.yml`): Checks formatting on PRs and pushes to main.
- **Broken links** (`.github/workflows/broken-links-site.yml`): Checks for broken links using lychee.
