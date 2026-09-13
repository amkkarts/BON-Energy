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
- The quote form sends enquiries through EmailJS and does not require a custom backend.

## Configure enquiry emails

The quote form uses EmailJS in the browser. In `js/script.js`, replace the three placeholder values in `emailjsConfig` with the values from your EmailJS account:

- `publicKey`: _hfJPN_qQQRVadmaj
- `serviceId`: Email service ID
- `templateId`: email template ID

Configure the EmailJS template with this subject:

```text
BON Energy enquiry: {{title}}
```

Use this content:

```text
A new enquiry has been received from {{name}}.

Company: {{company}}
Phone / WhatsApp: {{phone}}
Email: {{email}}
Location: {{location}}
Required model: {{model}}

Application / job description:
{{message}}
```

Set the template's `Reply To` field to `{{reply_to}}`. These are the parameters sent by the website: `title`, `name`, `company`, `phone`, `email`, `location`, `model`, `message` and `reply_to`.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static web server.
