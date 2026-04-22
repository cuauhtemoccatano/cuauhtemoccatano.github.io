## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-18 - [Localized Accessibility Labels]
**Learning:** For multi-language applications, interactive elements without visible text (icon-only buttons) must have localized `aria-label` and `title` attributes. Hardcoded English labels in JavaScript often lead to a disjointed UX for non-English users.
**Action:** Use a declarative approach by adding `data-i18n-label` and `data-i18n-title` attributes to HTML elements and updating them in the `updateLanguage` function. Ensure these labels are also updated during state changes (e.g., theme toggling) to maintain synchronization between visual state and assistive technology announcements.
