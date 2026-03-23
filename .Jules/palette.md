## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Interactive Component Focus Management]
**Learning:** Automated focus on multi-section pages can cause disruptive page jumps and disorient users. Managing focus through user interaction (click-to-focus) and providing visual feedback with `:focus-within` creates a more controlled and pleasant UX.
**Action:** Replace `autofocus` with interaction-based focus management for complex components and use `:focus-within` for visual state transitions.
