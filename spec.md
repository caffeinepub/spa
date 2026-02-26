# Specification

## Summary
**Goal:** Set the "SPA For Accurate Measure" barn logo as the PWA app icon and make the app installable as a native-like app on iOS and Android.

**Planned changes:**
- Generate the barn logo (arched "SPA FOR ACCURATE MEASURE" text, hand-drawn barn, "BARN" label, cursive tagline "For accurate measure", dark gray on white) in 192×192, 512×512, and 180×180 sizes and save them to `frontend/public/assets/generated/`
- Update `manifest.json` with app name "SPA For Accurate Measure", short name "SPA Measure", white theme/background color, standalone display, and the generated icons
- Update `index.html` to reference the apple-touch-icon (180×180), manifest link, and white theme-color meta tag
- Register a service worker (`sw.js`) that precaches the app shell so the app works offline and triggers the browser install prompt

**User-visible outcome:** Users can install the app to their home screen on Android and iOS; the app icon will display the barn logo, the app launches in standalone mode, and it functions offline.
