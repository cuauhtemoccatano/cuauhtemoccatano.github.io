## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2024-05-15 - [Improving Interactive Terminal UX]
**Learning:** For terminal-style components, users expect the entire terminal area to be interactive. Clicking anywhere in the terminal body should focus the input field.
**Action:** Always add a click listener to the terminal's container that delegates focus to the hidden or visible input field.
