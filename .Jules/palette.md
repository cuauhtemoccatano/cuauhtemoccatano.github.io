## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-20 - [Standardized Accessibility Localization]
**Learning:** For multi-language apps, localizing only innerText is insufficient. Screen reader context (aria-label), tooltips (title), and form hints (placeholder) must be part of the core translation cycle to ensure a consistent experience across all languages.
**Action:** Use `data-i18n-label`, `data-i18n-title`, and `data-i18n-placeholder` attributes and ensure the `updateLanguage` function iterates through these specifically during state/language transitions.
