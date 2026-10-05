# Style conventions

`src/index.css` owns shared design values and `.button-control`. Component CSS Modules
own layout and component-specific details. Check both languages, both themes and narrow
screens when changing shared styles.
The base control rule uses `:where()` so component layout overrides do not depend on CSS
chunk order; keep hover and focus rules explicit.

## Colors and surfaces

- Use `--text-primary` for main copy, years, card borders and control borders.
- Use `--text-subtle` for secondary information such as disabled material actions and 404 copy.
- `--bg-page` is the page background; `--bg-surface` distinguishes cards, menus and modals.
- `--border-color` is for quiet dividers and switch tracks. Interactive borders follow
  the text with `currentColor` and become accented on hover and keyboard focus.
- Buttons have transparent backgrounds in both themes.
- The light accent is `#cc302c`, with at least 4.5:1 text contrast on both light surfaces.
- The cookie banner stays dark. Its text uses `--banner-text`, and its hover/focus text
  uses the lighter `--banner-accent` to remain readable against that background.

Theme colors animate as registered custom properties on the root. Keep
`useThemePreference`'s temporary `--transition-theme: 0s`: reanimating inherited colors
inside components would make them lag behind the palette. Navigation selection has its
own `--nav-emphasis` transition outside visited links; do not replace it with a local
color transition on the link.

## Type and controls

- Vremena uses weight 300 for body copy and 400 for headings and controls.
- Main prose uses `--body-font-size` (20 / 18 / 17px) and `--body-line-height`.
  About, company descriptions, case-study paragraphs/lists and 404 copy share this scale.
  On the About landing page, the subtitle fills its text column and the introduction
  fills the section width. Do not limit these two blocks by character count.
- Main actions, Back, Settings and the mobile menu use `.button-control`:
  minimum height 44px, type 18px (17px on mobile), padding 8px 20px, 1px border and pill shape.
  Multiline labels may increase the height; do not clamp them to 44px.
- Material actions use a compact `.button-control` variant: minimum height 36px,
  type 14px, padding 6px 12px and 18px icons. Always show Download, Open in new window
  and Visit link in that order. A file enables downloading and opening; a URL enables
  visiting the source. Unavailable actions are native disabled buttons with muted
  text and no hover accent. On mobile, the three actions fill the available width.
  Focused actions scroll fully into view, including clearance for their focus outline.
- Material dialogs show a centered title above the preview, followed by the description
  and actions. Long titles wrap on narrow screens and fade with the material content
  during carousel navigation. Keep the carousel position available to screen readers
  without a visible counter.
  All material types share a 900px maximum modal width, the same preview sizing and
  the same side space, including single-item galleries. On narrow screens, leave
  8px on each side of the modal. Desktop actions stay in one row when space allows;
  keep wrapping available for smaller windows and enlarged text.
- Use `.button-label` for Vremena's optical vertical adjustment. Wrapping labels override
  its height, line height and white space, as material and cookie actions do.
- Icon-only controls use the same 44px target and a 22px icon. Inline icons may use `em`.
- Focus rings share a 2px width and 4px offset. Scrollable modal content reserves room
  for these rings so they remain visible.
- Hover styling belongs inside `(hover: hover) and (pointer: fine)`. Keyboard focus gets
  the same accent/arrow treatment plus a visible focus ring.

The cookie banner intentionally uses compact 14px text and rectangular buttons. Navigation
links, card previews and round carousel controls are separate families. Their different
shapes and typography are intentional; they share colors, target sizes and interaction rules.

## Motion and responsive layout

- `--transition-duration` is 300ms. The fast/slow aliases retain separate easing curves
  and also drive JavaScript timers through `getTransitionDuration`.
- Arrow movement uses `--arrow-offset` (4px), reversed for Back.
- Preserve reduced-motion overrides for both CSS and JavaScript.
- Layout padding is 30 / 24 / 16px. The menu switches at 768/769px; card columns at 960px.
  These breakpoints solve different layout needs and need not match.
- All portfolio cards share their dimensions across sections and languages. Keep the
  responsive minimum heights and content-fit checks when changing card typography or spacing.
  Card actions use an explicit line height so their size does not depend on system font metrics.
  Cards must grow when user text spacing or larger fonts need more room.
- The cookie banner reserves its measured height plus bottom/focus clearance in the page
  and document scroll padding. Keep this space in sync with resizing and locale changes.
  Focused page controls must stay above the banner, including after a resize.
- Carousel controls stay vertically centered on the modal and horizontally centered
  between its edge and the preview. Descriptions scroll inside the reserved side space.
  Restore focus without animated page scrolling when closing a modal; keep its trigger visible.

Run `npm run check`, `npm run build` and `npm run test:e2e` after changing shared rules.
Review the layout screenshots as well as the test results.
