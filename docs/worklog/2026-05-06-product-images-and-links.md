# Work Log: Product Images and Links

## Intent

Make the adidas tracker usable by showing product photos and exposing clickable retailer links.

## Changes

- Added live image URLs for the mock products
- Added retailer URLs for each tracked offer
- Updated product cards to render real product images
- Updated the comparison table to render clickable seller links and thumbnails

## Verification

- Checked the mock dataset for image and retailer URLs
- Checked the dashboard code paths that render cards and offer links
- Kept the data model file-based so the next scraper step can replace the mock layer directly

## Next

- Open the dashboard and confirm the images load in the browser
- Replace retailer search links with direct product links where possible
