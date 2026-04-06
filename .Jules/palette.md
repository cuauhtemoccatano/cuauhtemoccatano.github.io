## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-14 - [Localized Accessibility & Initialization Lifecycle]
**Learning:** Initializing localized ARIA labels and theme-specific attributes requires the DOM to be fully ready. Automated environments (like Playwright) may execute scripts before the DOM is stable if not explicitly handled. Additionally, attributes like `aria-label` and `title` for icon-only buttons must be synchronized during both theme toggles and language switches.
**Action:** Wrap initial theme and language application in `DOMContentLoaded` listeners. Use a dedicated `updateThemeAria` helper that is called whenever either the theme or the language changes to maintain consistent accessibility.
