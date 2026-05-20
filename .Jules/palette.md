## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Accessible I18n Patterns]
**Learning:** For projects with custom i18n implementations, accessibility labels (ARIA) must be synchronized with the language state. Using data attributes like `data-i18n-label` allows for a declarative way to update screen reader context alongside UI text.
**Action:** Always extend the i18n `updateLanguage` function to handle ARIA labels and titles to ensure a consistent experience for assistive technology users across all supported languages.
