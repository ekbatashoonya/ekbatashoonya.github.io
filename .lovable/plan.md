

# Ek Bata Shoonya — Educational Platform Plan

## Overview
A static educational website built with React + Vite, designed for GitHub Pages deployment. Features three language/register modes (Pure Hindi, Mixed Hindi-English, and Hinglish), a warm and friendly design aesthetic with subtle light-yellow accents, and a course-based learning system.

---

## 1. Branding & Design System

**Visual Identity**
- Title: "Ek Bata Shoonya / एक बटा शून्य"
- Warm, friendly aesthetic with rounded elements
- Subtle light-yellow background accent (#FFFBEB or similar)
- Sans-serif fonts for modern readability
- Generous spacing and comfortable reading width (~65ch max)
- Mobile-first, accessible design

---

## 2. Language Mode System (Core Feature)

**Three Modes with URL Routing**
1. **हिन्दी (शुद्ध)** → `/hi-shuddh/...` — Pure Devanagari, minimal English
2. **हिन्दी + English** → `/hi-mixed/...` — Devanagari with English technical terms
3. **Hinglish (Roman)** → `/hinglish/...` — Roman script only, no Devanagari

**Behavior**
- Persistent selector in the header (always visible)
- Mode stored in localStorage, persists across sessions
- Switching mode navigates to parallel page in new mode
- Default redirect: `/` → saved mode's home, or `/hi-mixed/` for first-time visitors
- "Not available" fallback page when content doesn't exist in selected mode

---

## 3. Information Architecture

### Navigation Structure
```
Home | Courses | Notes | Blog | About
```

### Page Breakdown

**Home Page**
- Hero section with title in both scripts
- Two CTAs: "Start learning" → Courses, "Browse notes" → Notes
- What this is (brief intro)
- Who it's for (target audience)
- How to use (quick guide)
- Newsletter signup placeholder (UI only, no backend)

**Courses Section**
- Course listing as friendly cards with thumbnails
- Course: "Mathematical Logic" containing:
  - Logic Lecture 0 (Foundations)
  - Placeholder lectures for future content
- Each course has: Overview, Syllabus, Lectures index
- Each lecture includes:
  - Objectives
  - Prerequisites
  - Main content (Markdown with KaTeX math)
  - Examples
  - Exercises
  - Prev/Next navigation
  - Breadcrumbs

**Notes Library**
- Filterable list of notes:
  - By course, topic, mode, type (PDF/LaTeX/Cheatsheet)
- Each note shows: Title, Mode, Last updated
- Actions: View (opens PDF in new tab), Download, View LaTeX
- Metadata stored in JSON file
- PDFs served from `/public/notes/`

**Blog / Updates**
- Simple blog list with date and title
- Individual post pages
- Posts stored as Markdown in repo
- Sample post: "Welcome to Ek Bata Shoonya"

**About Page**
- Mission statement
- Bio placeholder
- Contact: mailto link + "Suggest an improvement" (GitHub issues placeholder)

---

## 4. Content System

**Markdown-Based Authoring**
- Course/lecture content as `.md` files in `src/content/`
- Markdown rendered with `react-markdown`
- Math rendering with KaTeX (inline `$...$` and block `$$...$$`)
- Basic code syntax highlighting

**Sample Content (Minimal Scaffolding)**
- 1 sample lecture (Logic Lecture 0) in all 3 modes
- 1 sample note entry
- 1 sample blog post
- Demonstrates style differences between modes

---

## 5. Routing & GitHub Pages Setup

**Route Structure**
```
/                           → Redirect to saved mode
/{mode}/                    → Home (mode = hi-shuddh | hi-mixed | hinglish)
/{mode}/courses             → Course listing
/{mode}/courses/{course}    → Course overview
/{mode}/courses/{course}/{lecture} → Lecture page
/{mode}/notes               → Notes library
/{mode}/blog                → Blog listing
/{mode}/blog/{slug}         → Blog post
/{mode}/about               → About page
```

**GitHub Pages Compatibility**
- HashRouter for reliable deep linking (no 404s on refresh)
- Vite config with correct `base` path for project sites
- GitHub Actions workflow for automated build & deploy

---

## 6. Components to Build

- **Header**: Logo, navigation, language mode selector
- **Footer**: Copyright, GitHub link, mode quick-links
- **ModeSelector**: Dropdown/toggle for switching modes
- **CourseCard**: Preview card for course listing
- **LectureLayout**: Breadcrumbs, content, prev/next navigation
- **NoteItem**: Filterable note entry with actions
- **MarkdownRenderer**: Renders content with KaTeX math support
- **NotAvailable**: Friendly fallback when content missing in mode

---

## 7. Technical Deliverables

- Complete React + Vite + TypeScript project
- Tailwind CSS for styling (already available)
- Vite config for GitHub Pages (`base` path)
- HashRouter setup for reliable routing
- `.github/workflows/deploy.yml` for GitHub Actions deployment
- Content folders structure:
  ```
  src/content/
    courses/
      logic-lecture-0/
        hi-shuddh.md
        hi-mixed.md
        hinglish.md
    blog/
      welcome.md
    notes/
      index.json
  public/notes/
    sample-notes.pdf
  ```

---

## Summary

This plan creates a polished, accessible educational platform that works seamlessly on GitHub Pages with three distinct language modes. The warm, friendly design prioritizes readability while the modular content system makes it easy to add new courses and materials. All content lives in the repo as Markdown, making it easy to author and version control.

