# LinguaBloom — Frontend Prototype

Static HTML/CSS/JS prototype based on the LinguaBloom Online English Platform brief. No build step and no framework.

## Run
Open `index.html` in a browser, or serve the folder:
```
npx serve .        # or: python3 -m http.server
```

## Screens (hash routes)
- `#home`: landing page with hero, journey, CEFR ladder, courses, live and self-paced learning, packages, dashboard showcase, teachers, testimonials, Phase 2 app, FAQ
- `#placement`: placement test that recommends a CEFR level, with confetti and a teacher-confirmation note
- `#packages`: package builder (course, format, duration, classes/day, study days, weeks, start date, time zone conversion, teacher availability, policies, promo code `BLOOM10`) and a demo checkout with receipt
- `#library`: self-paced library with type filters and search
- `#student`, `#teacher`, `#admin`: role dashboards

## Features
- EN/AR toggle with full RTL (top-right globe button)
- Responsive from 360px to desktop
- Scroll reveals, counters, animated charts and other micro-interactions; respects `prefers-reduced-motion`

## Images
Photos are real stock photos loaded from Unsplash (free licence). Replace them with LinguaBloom's own photography before launch. If a photo can't load, a soft gradient shows in its place.

All prices, names and figures are sample data.
