## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-20 - [Keyboard Focus in Custom Cursor Environments]
**Learning:** In design systems where the system cursor is globally hidden (`cursor: none !important`), visual keyboard focus indicators using CSS `:focus-visible` are critical for accessibility. Setting `outline: none` on inputs/selectors suppresses the default focus ring, rendering the interface completely unnavigable for keyboard and screen-reader users.
**Action:** Replace all `outline: none` declarations with `outline: 2px solid transparent` on focus/active elements to allow custom high-contrast `:focus-visible` outline styles to cascade and render cleanly with high contrast.
