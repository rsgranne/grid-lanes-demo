document.addEventListener("DOMContentLoaded", () => {
  /*
    Wait until the HTML has finished loading before trying to find elements.

    If we try to grab elements too early, JavaScript may run before the page
    has actually created those elements.
  */

  // The layout dropdown menu
  const select = document.querySelector("#layoutMode");

  // The main gallery container whose class changes when a new layout is selected
  const gallery = document.querySelector(".gallery");

  // The note that JavaScript updates with browser support information
  const browserNote = document.querySelector(“.browser-note”);

  /*
    Get all the images inside the gallery.

    querySelectorAll() returns a NodeList, which looks array-like but is not a true array.
    Array.from() converts it into a real array so we can use array methods on it easily.
  */
  const images = Array.from(
    document.querySelectorAll(".gallery > figure > img")
  );

  /*
    Safety check

    If any of the important elements are missing, stop immediately.
    This prevents JavaScript errors later.

    !select means “select does not exist”
    !gallery means “gallery does not exist”
    !browserNote means “browserNote does not exist”
    images.length === 0 means “no images were found”
  */
  if (!select || !gallery || !browserNote || images.length === 0) {
    return;
  }

  /*
    The code display area under the layout picker.

    This shows the key CSS lines for whichever layout is currently selected,
    so students can see exactly which properties drive the layout.
  */
  const codeDisplay = document.querySelector(".key-css code");

  /*
    Key CSS snippets for each layout mode.

    These are intentionally minimal — only the lines that explain
    what makes each layout work, not the full CSS.
  */
  const keyCSSSnippets = {
    "grid":
`display: grid;
grid-template-columns: repeat(4, 1fr);`,

    "multicol":
`columns: 4 200px;
figure { display: inline-block; }`,

    "lanes-columns":
`display: grid-lanes;
grid-template-columns: repeat(4, 1fr);`,

    "lanes-alt":
`display: grid-lanes;
grid-template-columns: repeat(2, 0.75fr 1.35fr);`,

    "lanes-rows":
`display: grid-lanes;
grid-template-rows: repeat(3, 150px);
overflow-x: auto;`,

    "lanes-rows-wide":
`display: grid-lanes;
grid-template-rows: repeat(3, 150px);
overflow-x: auto;`
  };

  /*
    Extra notes that appear below the code snippet for certain modes.

    Most modes do not need a note, so only the ones that do are listed here.
  */
  const keyCSSNotes = {
    "grid": "Each row is as tall as its tallest image, so shorter images leave empty space below them.",
    "multicol": "Images flow top to bottom in each column, then wrap to the next column.",
    "lanes-columns": "Like multi-column, but images pack tightly without the empty space that Grid creates.",
    "lanes-alt": "Alternating narrow & wide columns add visual variety while still packing tightly.",
    "lanes-rows": "These images are tall & narrow, so they look cramped at this height. Compare with the next option to see how image proportions affect the layout.",
    "lanes-rows-wide": "These images come from a second set with wider proportions."
  };

  /*
    Track whether the viewport is below the narrow-screen breakpoint.

    matchMedia lets us check a CSS media query from JavaScript.
    When the screen is narrow, all layouts collapse to single-column,
    so the key CSS snippet should reflect that instead of showing
    the normal layout-specific CSS.
  */
  const narrowQuery = window.matchMedia("(width < 992px)");

  /*
    Update the key CSS display to match the currently selected mode.

    If the screen is narrow, show the single-column override instead
    of the layout-specific snippet, since that is what is actually
    happening at this width.
  */
  function updateKeyCSSDisplay(mode) {
    if (codeDisplay) {
      if (narrowQuery.matches) {
        codeDisplay.textContent = ".gallery { display: block; }";
      } else {
        codeDisplay.textContent = keyCSSSnippets[mode] || "";
      }
    }

    /*
      If there is already a note element, update or remove it.
      If there is no note element but we need one, create it.
    */
    const controls = document.querySelector(".controls");
    let noteEl = controls.querySelector(".key-css-note");
    const noteText = narrowQuery.matches ? null : keyCSSNotes[mode];

    if (noteText) {
      if (!noteEl) {
        noteEl = document.createElement("p");
        noteEl.className = "key-css-note";
        controls.appendChild(noteEl);
      }
      noteEl.textContent = noteText;
    } else if (noteEl) {
      noteEl.remove();
    }
  }

  /*
    When the viewport crosses the 992px breakpoint (e.g., rotating a phone
    or resizing a browser window), update the snippet to match.
  */
  narrowQuery.addEventListener("change", () => {
    updateKeyCSSDisplay(select.value);
  });

  /*
    All possible layout classes that can be applied to the gallery.

    When the user changes layouts, we remove all of these classes first,
    then add back the one layout class we actually want.
  */
  const modes = [
    "grid",
    "multicol",
    "lanes-columns",
    "lanes-alt",
    "lanes-rows",
    "lanes-rows-wide"
  ];

  /*
    These are the layouts that require Grid Lanes support.

    If the browser does not support Grid Lanes, these options will be disabled.
  */
  const gridLanesModes = [
    "lanes-columns",
    "lanes-alt",
    "lanes-rows",
    "lanes-rows-wide"
  ];

  /*
    Default image set

    This is the “normal” set of 40 image sizes used by:
    - Grid
    - Multi-column
    - Grid Lanes – columns
    - Grid Lanes – alternating columns
    - Grid Lanes – horizontal (rows)

    We use picsum.photos with different width/height values
    so the gallery shows images of many different shapes and sizes.
  */
  const defaultImageSources = [
    "https://picsum.photos/190/180?random=1",
    "https://picsum.photos/220/260?random=2",
    "https://picsum.photos/180/320?random=3",
    "https://picsum.photos/210/210?random=4",
    "https://picsum.photos/230/390?random=5",
    "https://picsum.photos/200/240?random=6",
    "https://picsum.photos/240/340?random=7",
    "https://picsum.photos/185/280?random=8",
    "https://picsum.photos/225/430?random=9",
    "https://picsum.photos/195/200?random=10",
    "https://picsum.photos/235/360?random=11",
    "https://picsum.photos/205/250?random=12",
    "https://picsum.photos/215/410?random=13",
    "https://picsum.photos/175/230?random=14",
    "https://picsum.photos/200/300?random=15",
    "https://picsum.photos/245/470?random=16",
    "https://picsum.photos/190/220?random=17",
    "https://picsum.photos/230/350?random=18",
    "https://picsum.photos/180/290?random=19",
    "https://picsum.photos/220/380?random=20",
    "https://picsum.photos/210/270?random=21",
    "https://picsum.photos/195/330?random=22",
    "https://picsum.photos/240/260?random=23",
    "https://picsum.photos/185/400?random=24",
    "https://picsum.photos/225/240?random=25",
    "https://picsum.photos/200/360?random=26",
    "https://picsum.photos/235/310?random=27",
    "https://picsum.photos/175/280?random=28",
    "https://picsum.photos/215/450?random=29",
    "https://picsum.photos/205/230?random=30",
    "https://picsum.photos/245/390?random=31",
    "https://picsum.photos/190/250?random=32",
    "https://picsum.photos/230/420?random=33",
    "https://picsum.photos/180/210?random=34",
    "https://picsum.photos/220/340?random=35",
    "https://picsum.photos/200/460?random=36",
    "https://picsum.photos/240/220?random=37",
    "https://picsum.photos/185/370?random=38",
    "https://picsum.photos/225/300?random=39",
    "https://picsum.photos/195/440?random=40"
  ];

  /*
    Wider image set

    This second image set is used only for:
    Grid Lanes – horizontal (rows), wider images

    The goal is to keep most images wider so the horizontal layout
    reads more clearly, while still mixing in some narrower ones
    for variety.
  */
  const wideImageSources = [
    "https://picsum.photos/300/180?random=1",
    "https://picsum.photos/200/220?random=2",
    "https://picsum.photos/280/190?random=3",
    "https://picsum.photos/340/210?random=4",
    "https://picsum.photos/360/220?random=5",
    "https://picsum.photos/290/180?random=6",
    "https://picsum.photos/330/200?random=7",
    "https://picsum.photos/180/230?random=8",
    "https://picsum.photos/370/220?random=9",
    "https://picsum.photos/280/170?random=10",
    "https://picsum.photos/350/210?random=11",
    "https://picsum.photos/220/210?random=12",
    "https://picsum.photos/360/230?random=13",
    "https://picsum.photos/270/180?random=14",
    "https://picsum.photos/320/200?random=15",
    "https://picsum.photos/380/240?random=16",
    "https://picsum.photos/170/220?random=17",
    "https://picsum.photos/340/210?random=18",
    "https://picsum.photos/300/190?random=19",
    "https://picsum.photos/360/220?random=20",
    "https://picsum.photos/210/190?random=21",
    "https://picsum.photos/330/210?random=22",
    "https://picsum.photos/350/200?random=23",
    "https://picsum.photos/190/220?random=24",
    "https://picsum.photos/340/180?random=25",
    "https://picsum.photos/320/210?random=26",
    "https://picsum.photos/360/200?random=27",
    "https://picsum.photos/160/210?random=28",
    "https://picsum.photos/230/230?random=29",
    "https://picsum.photos/300/180?random=30",
    "https://picsum.photos/380/220?random=31",
    "https://picsum.photos/200/190?random=32",
    "https://picsum.photos/350/240?random=33",
    "https://picsum.photos/150/200?random=34",
    "https://picsum.photos/340/210?random=35",
    "https://picsum.photos/320/230?random=36",
    "https://picsum.photos/180/180?random=37",
    "https://picsum.photos/290/220?random=38",
    "https://picsum.photos/170/210?random=39",
    "https://picsum.photos/370/240?random=40"
  ];

  /*
    Figure out a human-readable browser label.

    This is not used for actual feature detection.
    It is only used to write a friendly sentence for the user.

    Real feature detection happens later with CSS.supports().

    This function tries several methods:
    1. Modern browser brand data: navigator.userAgentData.brands
    2. Brave-specific detection
    3. Older user-agent string matching
    4. Generic fallback text
  */
  function getBrowserLabel() {
    const ua = navigator.userAgent || "";
    const uaData = navigator.userAgentData;

    /*
      Modern Chromium-family browsers may provide brand information here.

      Example brands might include:
      - Brave
      - Microsoft Edge
      - Opera
      - Google Chrome
      - Chromium
    */
    if (uaData && Array.isArray(uaData.brands)) {
      const braveEntry = uaData.brands.find((entry) =>
        /Brave/i.test(entry.brand)
      );

      if (braveEntry) {
        return braveEntry.version
          ? `Brave ${braveEntry.version} (a Chromium-based browser)`
          : "Brave (a Chromium-based browser)";
      }

      const edgeEntry = uaData.brands.find((entry) =>
        /Microsoft Edge/i.test(entry.brand)
      );

      if (edgeEntry) {
        return edgeEntry.version
          ? `Edge ${edgeEntry.version} (a Chromium-based browser)`
          : "Edge (a Chromium-based browser)";
      }

      const operaEntry = uaData.brands.find((entry) =>
        /Opera/i.test(entry.brand)
      );

      if (operaEntry) {
        return operaEntry.version
          ? `Opera ${operaEntry.version} (a Chromium-based browser)`
          : "Opera (a Chromium-based browser)";
      }

      const chromeEntry = uaData.brands.find((entry) =>
        /Google Chrome/i.test(entry.brand)
      );

      if (chromeEntry) {
        return chromeEntry.version ? `Chrome ${chromeEntry.version}` : "Chrome";
      }

      /*
        If all we can tell is that the browser is some generic Chromium-based browser,
        do not pretend we know more than we do.
      */
      const chromiumEntry = uaData.brands.find((entry) =>
        /Chromium/i.test(entry.brand)
      );

      if (chromiumEntry) {
        return "Your Chromium-based browser";
      }
    }

    /*
      Brave sometimes exposes navigator.brave.isBrave().
      If so, we can identify Brave even if the earlier brand list did not help.
    */
    if (navigator.brave && typeof navigator.brave.isBrave === "function") {
      return "Brave (a Chromium-based browser)";
    }

    /*
      Older fallback method: parse the old user-agent string.

      This is less reliable, but still useful as a backup.
    */
    let match;

    /*
      Safari uses Version/x.y and Safari/...
      We exclude Chrome/Chromium/Edge/Opera because they also contain Safari in the UA.
    */
    if (
      (match = ua.match(/Version\/(\d+(?:\.\d+)?).*Safari\//)) &&
      !/Chrome|Chromium|Edg|OPR/.test(ua)
    ) {
      return `Safari ${match[1]}`;
    }

    if ((match = ua.match(/Firefox\/(\d+(?:\.\d+)?)/))) {
      return `Firefox ${match[1]}`;
    }

    if ((match = ua.match(/Edg\/(\d+(?:\.\d+)?)/))) {
      return `Edge ${match[1]} (a Chromium-based browser)`;
    }

    if ((match = ua.match(/OPR\/(\d+(?:\.\d+)?)/))) {
      return `Opera ${match[1]} (a Chromium-based browser)`;
    }

    if ((match = ua.match(/Chrome\/(\d+(?:\.\d+)?)/))) {
      return `Chrome ${match[1]}`;
    }

    /*
      If all else fails, stay generic.
    */
    return "Your browser";
  }

  /*
    Apply one full set of image URLs to the gallery.

    sourceArray is expected to be an array of strings,
    where each string is an image URL.

    We loop through the gallery’s images and replace their src values.
  */
  function applyImageSet(sourceArray) {
    images.forEach((img, index) => {
      if (sourceArray[index]) {
        img.src = sourceArray[index];
      }
    });
  }

  /*
    Apply a layout mode to the gallery.

    1. Remove all possible layout classes
    2. Add the chosen layout class
    3. If the chosen mode is the “wider images” horizontal mode,
       swap in the wider image set
    4. Otherwise, use the default image set
  */
  function applyMode(mode) {
    gallery.classList.remove(...modes);
    gallery.classList.add(mode);

    if (mode === "lanes-rows-wide") {
      applyImageSet(wideImageSources);
    } else {
      applyImageSet(defaultImageSources);
    }

    // Show the key CSS lines for this layout
    updateKeyCSSDisplay(mode);
  }

  /*
    Real feature detection

    This checks whether the current browser actually supports:
    display: grid-lanes

    This matters more than the browser name,
    because browsers can lie or be vague about their names.
  */
  const supportsGridLanes =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("display", "grid-lanes");

  // Friendly browser label for the support message
  const browserLabel = getBrowserLabel();

  /*
    Update the note at the top of the page.

    If Grid Lanes is supported:
    - say so

    If Grid Lanes is not supported:
    - say so
    - disable the Grid Lanes options in the dropdown
    - if the current selection is one of those unsupported options,
      switch back to Grid
  */
  if (supportsGridLanes) {
    browserNote.textContent = `${browserLabel} can use Grid Lanes.`;
  } else {
    browserNote.textContent = `${browserLabel} cannot use Grid Lanes, so those options are disabled.`;

    Array.from(select.options).forEach((option) => {
      if (gridLanesModes.includes(option.value)) {
        option.disabled = true;
      }
    });

    if (gridLanesModes.includes(select.value)) {
      select.value = "grid";
    }
  }

  /*
    Apply the starting mode that is selected in the HTML
    when the page first loads.
  */
  applyMode(select.value);

  /*
    When the user changes the dropdown,
    apply the newly selected mode.
  */
  select.addEventListener("change", () => {
    applyMode(select.value);
  });
});
