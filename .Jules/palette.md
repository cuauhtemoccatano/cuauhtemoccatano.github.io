## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-18 - [Keyboard Focus Feedback with Custom Cursors]
**Learning:** In projects that hide the default mouse cursor using `cursor: none !important`, keyboard focus visibility is a vital lifeline for accessibility. Hiding or suppressing standard outlines on interactive elements without restoring custom `:focus-visible` styles makes the page completely unusable for non-mouse users. Specifying focus rings with target ID selectors overrides high-specificity transparent outlines.
**Action:** Always pair a custom cursor system with a high-contrast `:focus-visible` outline transition, and replace `outline: none` with `outline: 2px solid transparent` on specific interactive elements to ensure accessibility focus is never suppressed.
