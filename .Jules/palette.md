## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-04-01 - [Localized ARIA and Accessibility Feedback]
**Learning:** Icon-only buttons (Oracle toggle, language switch, theme toggle) require localized ARIA labels that update dynamically when the user switches languages or themes. Using a custom `data-i18n-aria` attribute allows for centralized management of these accessible labels within the existing translation system.
**Action:** Use `data-i18n-aria` on interactive elements to ensure screen readers provide accurate context in the user's preferred language, and ensure theme toggle labels reflect the *next* state (e.g., "Switch to light mode").
