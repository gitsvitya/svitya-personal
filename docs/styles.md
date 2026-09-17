# Style conventions

`src/index.css` owns shared design values and `.button-control`. Component CSS Modules
own layout and component-specific details. Check both languages, both themes and narrow
screens when changing shared styles.
The base control rule uses `:where()` so component layout overrides do not depend on CSS
chunk order; keep hover and focus rules explicit.

## Colors and surfaces

- Use `--text-primary` for main copy, years, card borders and control borders.
- Use `--text-subtle` for secondary information such as the material counter and 404 copy.
- `--bg-page` is the page background; `--bg-surface` distinguishes cards, menus and modals.
- `--border-color` is for quiet dividers and switch tracks. Interactive borders follow
  the text with `currentColor` and become accented on hover and keyboard focus.
- Buttons have transparent backgrounds in both themes.
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
- Main actions, Back, Settings, the mobile menu and material actions use `.button-control`:
  minimum height 44px, type 18px (17px on mobile), padding 8px 20px, 1px border and pill shape.
  Multiline labels may increase the height; do not clamp them to 44px.
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
  responsive heights and content-fit checks when changing card typography or spacing.
- Carousel controls stay vertically centered on the modal and horizontally centered
  between its edge and the preview. Descriptions scroll inside the reserved side space.

Run `npm run check`, `npm run build` and `npm run test:e2e` after changing shared rules.
Review the layout screenshots as well as the test results.
