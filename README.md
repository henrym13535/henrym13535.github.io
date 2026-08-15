# Henry Metz Portfolio — V2

## What changed
- 34th Street staff profile appears before featured work.
- Seven selected 34th Street pieces appear in a horizontal carousel.
- Featured cards display the original publication-hosted DOM artwork.
- All 25 34th Street pieces are listed below the carousel and link to 34st.com.
- Secondary work is organized into collapsible Essays & Coverage, Videos, and Research sections.
- The Zone of Interest essay and Emanuel's Trenches coverage PDFs are included in `/files`.

## Files to upload to GitHub
Upload all of these while preserving the folder structure:

- `index.html`
- `styles.css`
- `script.js`
- `files/`
  - `zone-of-interest.pdf`
  - `emanuel-trenches-coverage.pdf`

## One remaining placeholder
The Resume link in the About section still uses `href="#"`.
Once you have the final resume PDF, add it to `/files` and change the link to something like:

`href="files/henry-metz-resume.pdf"`


## V3 changes
- Smaller hero name.
- Main section titled 34th Street Magazine / Film & TV Editor & Writer.
- Featured Pieces carousel loops continuously.
- All Articles shows five items first, then expands with Show all articles.
- Resume link now points to the supplied Google Doc.

## V4 changes
- Replaced the carousel clone/reset approach with seamless DOM reordering.
- Moving right shifts one card left, then moves that card to the end after animation.
- Moving left moves the last card to the front before animating.
- There is no visible loop boundary or snap-back point.
- All Articles shows exactly the first 5 rows by default.
- Button text is now "Show all" / "Show fewer".

## V5 changes
- Fixed All Articles with direct JavaScript visibility control.
- Exactly 5 article rows display on load.
- Show all expands every remaining row.
- Show fewer collapses back to the first 5.
- Removed earlier CSS-based article hiding logic to avoid conflicts.

## Final touches
- Added Expand all / Collapse all in the top-right navigation.
- Expand all opens the full article list plus all three Other Work sections.
- Resume now opens inside `resume.html` using the live Google Docs published embed.
- The resume remains synced to the published Google Doc.
- Media titles in All Articles use straight double quotation marks.

## Live resume update
- `resume.html` now renders the current Google Doc through its PDF export endpoint.
- The source resume remains the same Google Doc.
- Future edits to the Google Doc flow into later PDF exports without replacing a PDF in GitHub.
- The Open live PDF link is included as a fallback if the embedded Google viewer is blocked by a browser.

## Final resume behavior
- The Resume link on the homepage opens the live, view-only Google Doc in a new tab.
- There is no separate resume.html page.
- Updating the source Google Doc keeps the same resume URL current.
