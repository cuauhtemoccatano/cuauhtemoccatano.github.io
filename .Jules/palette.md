## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Focus Visibility in Cursorless Interfaces]
**Learning:** In repositories utilizing `cursor: none !important`, the interface becomes unusable for keyboard users without an explicit focus strategy. Standard browser outlines are often suppressed or insufficient. Holistic feedback via `:focus-within` on parent containers (like terminal windows or chat bubbles) significantly improves spatial orientation.
**Action:** Implement a global high-contrast `:focus-visible` outline with an `outline-offset` transition and use `:focus-within` on interactive compound components to provide clear visual depth when their children are active.
