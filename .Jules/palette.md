## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Focus Visibility in Cursorless Interfaces]
**Learning:** In applications where the mouse cursor is globally hidden (`cursor: none !important`), high-contrast focus indicators (`:focus-visible`) are the primary navigation guide for all users, not just those using keyboards. Suppressing outlines without an immediate high-contrast replacement creates a "blind" interface.
**Action:** Always implement a global `:focus-visible` rule with `outline-offset` and remove any `outline: none` declarations that lack a compliant alternative.
