## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Unified i18n Accessibility Pattern]
**Learning:** In a multi-language app, hardcoded ARIA labels on icon-only buttons create an accessibility gap for non-English users. Extending the custom i18n system to handle attributes (aria-label, title) via `data-i18n-label` and `data-i18n-title` ensures a consistent accessible experience across all supported languages.
**Action:** Always use `data-i18n-label` for interactive elements without visible text, and ensure the `updateLanguage` function is equipped to synchronize these attributes.

## 2025-05-15 - [Keyboard Navigation in Cursorless Interfaces]
**Learning:** This project uses `cursor: none !important`, making the interface entirely dependent on visual focus indicators for keyboard users. A high-contrast global `:focus-visible` style with a positive `outline-offset` is essential to prevent the focus ring from being obscured by the "Liquid Glass" card borders and transitions.
**Action:** Implement `:focus-visible` with a clear `outline-offset` (e.g., 4px) to ensure the focus indicator "floats" clearly outside the element's boundaries, providing unmistakable feedback.
