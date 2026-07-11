## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-14 - [High-Contrast Focus for Keyboard Navigation]
**Learning:** In designs that use `cursor: none !important`, keyboard focus visibility becomes the primary way users understand their interaction point. Using `outline: none` on inputs is a critical accessibility barrier.
**Action:** Replace `outline: none` with `outline: 2px solid transparent` and implement a global `:focus-visible` rule with `!important` to ensure high-contrast focus rings are restored for keyboard users without affecting mouse-driven aesthetics.
