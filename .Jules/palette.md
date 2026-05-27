## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-27 - [Localized State Synchronization in ARIA Labels]
**Learning:** ARIA labels that change based on component state (e.g., theme toggles) must be synchronized using the current language's translation object in the event listener, not just on initial page load, to prevent them from reverting to a default language.
**Action:** Always use `translations[currentLang][stateKey]` when updating ARIA labels in event listeners.

## 2025-05-27 - [Granular ARIA Labeling for Form Elements]
**Learning:** Reusing the same translation key for an input and its associated action button (e.g., scan input vs. scan button) leads to redundant or confusing screen reader announcements.
**Action:** Define distinct keys like `input_label` and `button_label` even if the visual text is similar.
