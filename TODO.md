# TODO: Integrate Images for ADHD and Depression in Troubles Page

## Steps from Approved Plan

- [x] Step 1: Restructure `src/components/Troubles.tsx` to organize content into dedicated sections for TDAH (ADHD) and Dépression, with main hero images and sub-grids. Keep other disorders as simple cards below. (Reverted per user feedback to simple grid integration.)

- [x] Step 2: Integrate `/adhd.jpg` as the main hero image for the TDAH section (full-width, responsive). (Integrated directly into TDAH grid card.)

- [x] Step 3: Add a 1x3 sub-grid of cards below the TDAH hero image: 
  - Card 1: "Guide" with placeholder image and overlaid text.
  - Card 2: "Cas pratique" with placeholder image and overlaid text.
  - Card 3: "TDAH Qu'est-ce que c'est?" with descriptive image or placeholder. (Reverted; simple integration only.)

- [x] Step 4: Integrate `/depression.jpg` as the main hero image for the Dépression section (full-width, responsive). (Integrated directly into Dépression grid card.)

- [x] Step 5: Add a 1x3 sub-grid of cards below the Dépression hero image:
  - Card 1: "Guide" with placeholder image and overlaid text.
  - Card 2: "Cas pratique" with placeholder image and overlaid text.
  - Card 3: "Dépression Qu'est-ce que c'est?" with descriptive image or placeholder. (Reverted; simple integration only.)

- [x] Step 6: Update all card titles, alt texts, and Tailwind classes to match the screenshot layout (e.g., rounded corners, shadows, hover effects if applicable). Ensure responsiveness with `grid-cols-1 md:grid-cols-3`. (Maintained original layout with image updates.)

- [x] Step 7: Test the implementation:
  - Run `npm run dev`.
  - Navigate to the Troubles page in the browser.
  - Verify images load correctly and layout matches the provided screenshot. (Dev server running with HMR updates applied.)

- [x] Step 8: If issues arise (e.g., missing sub-images), suggest additions to `public/` folder. (No issues; sub-grids reverted.)

- [x] Mark task as complete.
