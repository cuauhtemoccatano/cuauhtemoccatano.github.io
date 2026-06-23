## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-06-23 - [Specificity and Cascade in Focus Indicator Overrides]
**Learning:** When using `:focus-visible` to restore focus indicators on elements that previously suppressed them with `outline: none` (or shorthand `outline: 2px solid transparent`) in a `:focus` state, the override rule must either have higher specificity or appear later in the stylesheet to avoid being clobbered by the cascade, especially if both rules share the same specificity.
**Action:** Always place global `:focus-visible` override blocks for specific interactive elements (like inputs and buttons) at the end of the main stylesheet to ensure they correctly apply across all components.
