## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-04-15 - [Unified Accessibility Localization Pattern]
**Learning:** Icon-only buttons and form inputs often lack accessible labels or have labels that don't synchronize with the app's localization system. Standardizing a pattern using `data-i18n-label` and `data-i18n-placeholder` allows for automatic updates of ARIA attributes during language transitions.
**Action:** Use `data-i18n-label` and `data-i18n-placeholder` for all interactive elements, and ensure the `updateLanguage` utility is configured to sync these attributes with the `translations` dictionary.
