# Specification

## Summary
**Goal:** Build a Land Area Calculator PWA called "SPA Field Measure" with a Motoko backend and a full-featured agricultural-themed frontend.

**Planned changes:**
- Add a Motoko backend actor exposing calculation methods: perimeter from wheel rotations, rectangle area, square area, irregular area from triangle pairs, and rotation-based area for square/rectangle shapes
- Build a frontend UI with shape selector (rectangle, square, irregular, rotation-based), input forms per shape, and results panel showing area in m², acres, hectares and perimeter in meters/km
- Configure the app as a PWA with manifest.json, service worker for offline caching, PWA meta tags, and apple-touch-icon for home screen installation
- Apply an earthy-green agricultural theme using OKLCH color tokens for light/dark modes, mobile-first single-column layout, sticky header with app logo, and sections for tips, formula reference, unit conversions, and footer

**User-visible outcome:** Users can open the app on mobile or desktop, select a field shape, enter measurements or wheel rotation data, and instantly see the calculated area and perimeter in multiple units. The app can be installed to the home screen and works offline.
