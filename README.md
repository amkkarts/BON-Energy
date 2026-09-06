# BON Energy Website

Static, responsive marketing website for BON Energy electric mini excavators.

## Project structure

```text
bon-energy-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── hero-bg.png
│       ├── about-banner.png
│       ├── our-tech-bg.png
│       ├── service-support-bg.png
│       ├── contact-bg.png
│       └── ...
├── .gitignore
└── README.md
```

## Implementation notes

- Semantic section structure and accessible labels are used throughout the page.
- Technology and Why BON sections use inline SVG icons, so no icon library or extra network request is required.
- Non-critical images use lazy loading and asynchronous decoding.
- CSS uses shared design tokens, reusable card patterns and responsive breakpoints.
- Navigation supports mobile toggle, Escape-to-close and outside-click closing.
- The quote form remains a front-end demo and does not submit data to a backend.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static web server.
