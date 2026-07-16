## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-14 - [Localized Accessibility Attributes]
**Learning:** Providing ARIA labels in English-only for an internationalized app creates an "accessibility gap" where screen reader users in other languages lose context.
**Action:** Implement a `data-i18n-aria-label` pattern in the `updateLanguage` logic to ensure all interactive elements' accessibility metadata stays synchronized with the user's selected language.
