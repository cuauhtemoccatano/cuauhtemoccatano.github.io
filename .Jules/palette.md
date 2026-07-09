## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-20 - [Keyboard Accessibility in Cursor-less Interfaces]
**Learning:** In interfaces that hide the mouse cursor globally (using `cursor: none !important`), visual focus indicators (`:focus-visible`) are the only way for users to track their position. Suppressing outlines (`outline: none`) without providing a high-contrast alternative is a critical accessibility failure in these environments.
**Action:** Implement a global high-contrast `:focus-visible` ring using `!important` to override local styles, and replace `outline: none` with `outline: 2px solid transparent` to ensure compatibility with Windows High Contrast Mode.
