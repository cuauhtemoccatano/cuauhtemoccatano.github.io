## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-07-12 - [Focus Restoration in Cursor-less Environments]
**Learning:** In projects using `cursor: none !important` for custom liquid cursors, standard browser focus indicators are often accidentally suppressed via `outline: none`. For keyboard users, this makes the interface completely invisible.
**Action:** Always implement a high-contrast global `:focus-visible` rule and replace `outline: none` with `outline: 2px solid transparent` on inputs/buttons to ensure the focus ring remains functional without interfering with mouse aesthetics.
