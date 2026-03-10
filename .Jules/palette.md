## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Synchronizing State across Cloned Components]
**Learning:** In a UI where the DOM is cloned for transitions (like this project's dark mode reveal), local state changes (like icon swaps or ARIA label updates) must be synchronized across all instances. Using `document.querySelectorAll` within the event handler ensures that all clones of an element reflect the same state simultaneously.
**Action:** Always target all instances of an interactive element when updating its state (labels, icons, disabled state) if it exists in multiple places due to DOM cloning.
