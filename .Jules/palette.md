## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Dynamic State Feedback for Theme Toggles]
**Learning:** For interactive elements that toggle between distinct states (like Dark/Light mode), static ARIA labels are insufficient. The interface must dynamically provide feedback on the *next* action or current state to both screen readers (`aria-label`) and mouse users (`title`).
**Action:** Update all instances of the toggle button (including cloned ones) in the transition event listener to ensure consistent and descriptive state feedback across the entire DOM.
