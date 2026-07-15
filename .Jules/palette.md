## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-07-15 - [Keyboard Visibility in Cursor-less Interfaces]
**Learning:** This repository uses `cursor: none !important` globally to implement a custom liquid cursor effect. In such environments, standard mouse-based orientation is removed, making high-contrast keyboard focus indicators (`:focus-visible`) the primary means of navigation for accessibility.
**Action:** Always implement a global `:focus-visible` rule with `!important` and a generous `outline-offset` to ensure interactive elements are discoverable. Replace `outline: none` with `outline: 2px solid transparent` on inputs to avoid suppressing the focus ring.
