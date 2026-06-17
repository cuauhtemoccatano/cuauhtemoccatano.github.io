## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Focus Visibility with Hidden Cursors]
**Learning:** In repositories using `cursor: none !important`, standard focus indicators are often suppressed by `outline: none` on interactive elements. Without a visible mouse pointer or a high-contrast focus ring, the interface becomes unusable for keyboard-only users.
**Action:** Implement a global high-contrast `:focus-visible` outline (e.g., `2px solid var(--accent-color)`) and ensure inputs use `outline: 2px solid transparent` instead of `none` to preserve visibility.
