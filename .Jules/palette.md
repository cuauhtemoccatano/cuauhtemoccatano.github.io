## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-22 - [Interactive Terminal Focus & Accessibility]
**Learning:** Terminal emulators in portfolios benefit significantly from a click-to-focus pattern on the body and visible focus states. Removing `autofocus` prevents intrusive page jumps on load for keyboard users, while ARIA labels ensure the input is identifiable by screen readers.
**Action:** Always implement a `:focus-within` visual state for terminal containers and use `aria-label` for command-line inputs.

## 2025-05-22 - [Icon-Only Button Context]
**Learning:** In a highly interactive "Liquid Glass" UI, icon-only buttons for AI assistants (Oracle) and modals (Booking) are common but inaccessible without explicit ARIA labels. Users relying on screen readers need these labels to understand the function of purely visual icons.
**Action:** Audit all `<button>` and `<a>` elements containing only `<i>` tags for missing `aria-label` attributes.
