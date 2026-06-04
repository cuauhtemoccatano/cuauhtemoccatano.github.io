## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Focus Visibility in Cursorless Interfaces]
**Learning:** In repositories using `cursor: none !important`, the most critical micro-UX enhancement is implementing a high-contrast global `:focus-visible` outline. Without a visible cursor, keyboard users rely entirely on these indicators to navigate.
**Action:** Always implement a global `:focus-visible` ring with `outline-offset` and complement it with `:focus-within` transitions on parent containers (e.g., cards, windows) to provide holistic visual feedback. Use `!important` on global focus rules to protect against future regressions or specific element resets.
