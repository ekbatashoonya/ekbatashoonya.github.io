# Ek Bata Shoonya / एक बटा शून्य

A static educational platform for Hindi-medium learners, featuring courses in Mathematical Logic and more.

## Features

- **Three Language Modes**: Pure Hindi (शुद्ध हिन्दी), Mixed Hindi-English, and Hinglish (Roman script)
- **Course System**: Structured lectures with KaTeX math support
- **Notes Library**: Downloadable PDFs and cheatsheets
- **Blog**: Updates and announcements
- **GitHub Pages Ready**: HashRouter for reliable deep-linking

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- react-markdown with KaTeX for math rendering
- HashRouter for GitHub Pages compatibility

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This project is configured for GitHub Pages deployment via GitHub Actions.

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Enable GitHub Pages in repo settings (Source: GitHub Actions)

## Content Structure

```
src/content/
├── courses/                    # Course lectures (Markdown)
│   └── mathematical-logic/
│       └── logic-lecture-0/
│           ├── hi-shuddh.md
│           ├── hi-mixed.md
│           └── hinglish.md
├── blog/                       # Blog posts (Markdown)
└── notes/
    └── index.json              # Notes metadata

public/notes/                   # PDF files for download
```

## Adding Content

### New Lecture
1. Create a folder under `src/content/courses/{course-slug}/{lecture-slug}/`
2. Add Markdown files for each mode: `hi-shuddh.md`, `hi-mixed.md`, `hinglish.md`
3. Update `src/content/data.ts` with lecture metadata

### New Blog Post
1. Create a folder under `src/content/blog/{post-slug}/`
2. Add Markdown files for each mode
3. Update `src/content/data.ts` with post metadata

### New Note
1. Add PDF to `public/notes/`
2. Update `src/content/notes/index.json` with metadata

## License

MIT
