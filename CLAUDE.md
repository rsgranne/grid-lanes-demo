# Grid Lanes Demo

## Project overview

This is a small teaching demo for college web development students. It compares several CSS layout methods using the same gallery of numbered placeholder images, with a dropdown menu that switches among layouts.

The final deliverable will eventually be pasted back into CodePen, but work should now be done in a small local project with three files:

index.html
style.css
script.js

## Current high-level goals

1. Show how different layout methods place the same content differently
2. Keep the demo visually clear and pedagogically useful
3. Add a small explanatory code area under the layout picker that shows only the key CSS lines for the currently selected layout
4. Keep the HTML/CSS/JS readable for students
5. Avoid unnecessary classes and IDs when the HTML structure already provides enough hooks

## Important teaching/style preferences

1. Use the existing HTML structure whenever practical instead of adding extra classes everywhere
   - Overuse of classes is “classitis”
   - Prefer semantic structure and combinators when practical

2. Do not use XHTML-style self-closing void elements in normal HTML
   - No space-slash at the end of img, meta, link, etc.
   - Use normal HTML5 void elements only
   - Example: <img ...> not <img ... />

3. Code should be easy for students to inspect
   - Clear comments are welcome
   - Overly clever code is not welcome
   - Prefer straightforward readability over abstraction

4. Keep code in plain fenced code blocks when discussing it with the user

5. The user prefers concise, structurally meaningful CSS examples over dumping complete rule blocks when teaching
   - The “key CSS lines” area should show only the essential lines that explain the layout

6. The user is not objecting to XHTML-style void tags as a matter of taste only
   - The objection is that they are obsolete in ordinary HTML and should not be used anymore, similar to dragging around obsolete markup habits like <center>

## Current layout options

The demo currently has these layout choices in the dropdown:

1. Grid
2. Multi-column
3. Grid Lanes – columns
4. Grid Lanes – alternating columns
5. Grid Lanes – horizontal (rows)
6. Grid Lanes – horizontal (rows), wider images

What each mode is meant to demonstrate

1. Grid
   - A regular grid
   - Images are displayed in a consistent row structure
   - Some images leave empty space within their boxes, which is part of the lesson

2. Multi-column
   - Content flows top to bottom, then wraps to the next column
   - Figures are kept together as units

3. Grid Lanes – columns
   - Masonry-style / lane-style packing based on columns

4. Grid Lanes – alternating columns
   - Same general idea as Grid Lanes columns, but with alternating narrow/wide columns

5. Grid Lanes – horizontal (rows)
   - Horizontal packing based on rows
   - Horizontal scrolling is part of the point here

6. Grid Lanes – horizontal (rows), wider images
   - Same layout logic as horizontal (rows)
   - Uses a second image set with mostly wider proportions, but also some narrower ones for variety

## Important wording/naming notes

1. In conversation with the user, refer to the fifth and sixth modes as “Horizontal”
   - Not “rows mode”
   - The visible label includes “(rows)”, which is fine
   - But conversationally, “Horizontal” is preferred

2. “Brick layout” should not be used in labels
   - It adds jargon and is not consistently used elsewhere

3. Visible labels should currently be:

Grid
Multi-column
Grid Lanes – columns
Grid Lanes – alternating columns
Grid Lanes – horizontal (rows)
Grid Lanes – horizontal (rows), wider images

## Current browser support behavior

The demo checks support with feature detection, not browser-version checking:

CSS.supports("display", "grid-lanes")

This is the real support test.

The page also shows a browser support message for the user. Browser labeling should work like this:

1. If the browser can be identified specifically, use that name
   - Example: Chrome 147
   - Example: Brave 147 (a Chromium-based browser)
   - Example: Edge 147 (a Chromium-based browser)

2. If it is only generically Chromium-based, do not pretend it is Chrome
   - Say: “Your Chromium-based browser”

3. If support is missing, the message should read like this pattern:
   - “[Browser label] does not support Grid Lanes, so those options are disabled.”

Example:
Your Chromium-based browser does not support Grid Lanes, so those options are disabled.

4. Unsupported Grid Lanes options should be disabled in the select menu

5. There is a fallback/no-JS note strategy in play
   - If needed, keep the static fallback note conceptually separate from the JS-updated support note
   - The user liked the idea of a normal fallback message plus a JS-updated message, but avoid duplicate confusing boxes

## Image behavior

There are two image sets in JavaScript:

1. defaultImageSources
   - Used for all normal modes, including Horizontal

2. wideImageSources
   - Used only for the wider-images Horizontal mode
   - Should be mostly wide, but not uniformly wide
   - The user wanted more variety
   - Some images should be moderately narrow
   - Some should be really narrow
   - One narrow one should appear near the beginning
   - The point is to keep the set feeling natural, not overly engineered

## Key CSS lines feature to add

A new feature should display very brief CSS snippets underneath the layout select menu.

This is important and should be included in the next implementation.

Purpose

When a student chooses a layout, the page should show only the key CSS lines that make that layout work.

Do not show the full CSS.
Do not show helper rules or cosmetic rules unless they are central to understanding the layout.
Focus on the smallest meaningful explanation.

The user explicitly wants this to be concise.

Current intended key CSS snippets

1. Grid

display: grid;
grid-template-columns: repeat(4, 1fr);

2. Multi-column

columns: 4 200px;
figure {
  display: inline-block;
}

3. Grid Lanes – columns

display: grid-lanes;
grid-template-columns: repeat(4, 1fr);

4. Grid Lanes – alternating columns

display: grid-lanes;
grid-template-columns: 0.75fr 1.35fr 0.75fr 1.35fr;

5. Grid Lanes – horizontal (rows)

display: grid-lanes;
grid-template-rows: repeat(3, 150px);
overflow-x: auto;

6. Grid Lanes – horizontal (rows), wider images

display: grid-lanes;
grid-template-rows: repeat(3, 150px);
overflow-x: auto;

Plus a short note under that snippet:

Uses a second image set with wider proportions

Why the snippet choices matter

The user wants only the core layout-triggering lines, not a full recipe.
For example, for Grid, only these two lines are wanted:

display: grid;
grid-template-columns: repeat(4, 1fr);

So the new feature should follow that principle everywhere.

## Implementation ideas for the key CSS lines feature

A simple approach is fine:
- Add a display area under the select menu
- Update its text when the selected layout changes
- Use pre/code or another simple semantic structure
- Keep the display legible and compact
- The exact rendering style is less important than the content and clarity

Please do not over-engineer this with complicated templating if simple JS can update the text.

## Current structural/code assumptions

1. The HTML, CSS, and JS live in separate files
2. The gallery is a single gallery on the page
3. The layout switcher works by changing classes on the gallery
4. JS swaps image source arrays for the wider-images mode
5. The gallery contains figures with:
   - a span showing the number
   - an img element

## Known pain points and cleanup priorities

1. Avoid unnecessary IDs unless truly needed
   - IDs are acceptable for JavaScript hooks when actually necessary
   - Otherwise prefer classes/structure

2. Avoid unnecessary extra classes when structure already gives a clean hook

3. Keep formatting sane and consistent
   - The user has run into formatter weirdness in CodePen
   - Do not assume formatter output is always trustworthy
   - Preserve readable indentation

4. Do not “modernize” or “clean up” things in ways that fight the teaching purpose
   - Example: longhand overflow-x / overflow-y may be clearer for teaching than shorthand
   - Example: terse lint-driven rewrites are not always desirable

5. Do not reintroduce XHTML-style void syntax anywhere

6. Keep comments strong enough that students can inspect the JS and follow what it is doing

## Current teaching posture

This is not just a toy effect demo. It is a classroom teaching artifact.
The code should help explain:
- how layout modes differ
- what minimal CSS causes the behavior
- how browser support affects what the user can choose
- how changing content shape can affect the look of a given layout

## What you should do next

1. Add the “key CSS lines” display under the select menu
2. Keep the snippets extremely brief, per the list above
3. Wire the snippet display to the dropdown selection
4. Preserve the current browser support logic
5. Preserve the two Horizontal variants
6. Preserve the two image sets and current switching logic
7. Keep comments strong and student-friendly
8. Avoid adding needless classes or IDs
9. Do not use XHTML-style self-closing void elements
10. Keep the implementation straightforward and maintainable
