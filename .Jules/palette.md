## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-12 - [Event Delegation for Cloned DOM Interactivity]
**Learning:** In environments where major DOM sections are cloned (like for theme transitions), static event listeners attached before cloning are lost on the cloned elements. Using event delegation on the `document` or a permanent parent ensures that interactive elements (like theme toggles) remain functional regardless of which clone is currently visible or active.
**Action:** Implement interactive logic using `document.addEventListener` with `event.target.closest` to maintain functionality across DOM clones.
