# CSS Layout Comparison Demo

An interactive classroom demo for comparing CSS Grid, Multi-column layout, and CSS Grid Lanes with switchable layouts, browser support detection, and teaching-focused CSS snippets.

## What this project does

This demo shows the same gallery content in several different layout systems so students can compare how each one places items.

The current modes are:

- Grid
- Multi-column
- Grid Lanes – columns
- Grid Lanes – alternating columns
- Grid Lanes – horizontal (rows)
- Grid Lanes – horizontal (rows), wider images

Each image is numbered so students can track ordering and placement more easily.

## Why this exists

This project was built as a teaching tool for web development students.

The goals are to:

- compare different CSS layout methods side by side
- make ordering and packing behavior obvious
- show minimal, meaningful CSS for each layout
- demonstrate browser support detection for Grid Lanes
- keep the code readable enough that students can inspect it

## Features

- Dropdown menu for switching layouts
- Numbered images so the flow/order is visible
- Browser support detection for CSS Grid Lanes
- Automatic disabling of unsupported Grid Lanes options
- Short teaching-focused CSS snippets shown for the selected layout
- Alternate image set for the wider Horizontal mode

## Browser support

This demo uses feature detection for Grid Lanes:

`CSS.supports("display", "grid-lanes")`

If the current browser does not support Grid Lanes, those options are disabled.

## Project structure

```index.html
style.css
script.js```

## Notes

- This project uses normal HTML5 void elements, not XHTML-style self-closing syntax.
- The code is intentionally structured for teaching clarity, not just terseness.
- Some longhand CSS is used on purpose because it is easier for students to understand.

## License

MIT
