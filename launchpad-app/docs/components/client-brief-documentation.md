---
title: ClientBrief - Technical Documentation
component_path: src/components/intelligence/client-brief.tsx
version: 1.0
date_created: 2026-03-12
tags: [component, intelligence, ui, react, nextjs]
---

# ClientBrief Documentation

The `ClientBrief` component is a high-fidelity, print-optimized React component designed to present a "Professional Client Brief" based on the results of the Intelligence analysis. It serves as the primary deliverable viewer for the agency-side users.

## 1. Component Overview

### Purpose/Responsibility
- **Primary Responsibility**: Render a comprehensive, aesthetic, and professional strategic report from raw analysis data.
- **Scope**: Includes cover page, performance metrics, SWOT analysis, growth roadmap, and strategic conclusions.
- **Relationships**: Parented by the `Intelligence` page; consumes data from the `/api/analyze` endpoint.

## 2. Architecture Section

- **Design Patterns**: Functional Component with Props Pattern. It utilizes the "Container-Presenter" pattern where the parent (`Intelligence` page) handles state/fetching and `ClientBrief` focuses on presentation.
- **Dependencies**: 
    - `lucide-react`: For iconography.
    - `framer-motion`: For entry animations.
    - `tailwind-merge` (via `@/lib/utils`): For dynamic styling.
- **Interactions**: Triggers browser printing for PDF generation.

### Component Structure and Dependencies Diagram

```mermaid
graph TD
    subgraph "Intelligence System"
        P[Intelligence Page] --> C[ClientBrief]
        C --> LU[lib/utils]
        C --> FM[framer-motion]
        C --> LR[lucide-react]
    end

    subgraph "External/Native"
        WP[window.print]
        PDF[PDF Export]
    end

    C -- "Action: Export" --> WP
    WP --> PDF

    classDiagram
        class ClientBrief {
            +data: Object
            +techData: Object
            +parsedData: Object
            +handoutData: Object
            +onClose: Function
            +render(): ReactElement
        }
```

## 3. Interface Documentation

| Method/Property | Purpose | Parameters | Return Type | Usage Notes |
|-----------------|---------|------------|-------------|-------------|
| `data` | Core scraped metrics and context | `Object` | N/A | Includes score, ttfb, title, and url. |
| `techData` | Technical audit results | `Object` | N/A | Includes healthScore and criticalCount. |
| `parsedData` | LLM-processed strategic insights | `Object` | N/A | Includes visuals, swot, and brief (roadmap). |
| `handoutData` | Executive copy for the handout | `Object` | N/A | Includes final conclusion and risk factors. |
| `onClose` | Callback to exit the brief view | `Function` | `void` | Triggers parent state update to hide modal. |

## 4. Implementation Details

- **Responsive Design**: Uses Tailwind's responsive prefixes (e.g., `md:p-20`) to ensure readability on mobile and desktop.
- **Print Optimization**: Utilizes `print:` utility classes (e.g., `print:relative`, `print:hidden`) to remove navigation UI and adjust padding for physical paper/PDF output.
- **Visual Hierarchy**: Implements a strict "Agency Style" with heavy black borders, uppercase tracking, and high-contrast typography (Black/White/Zinc).

## 5. Usage Examples

### Basic Usage

```tsx
<ClientBrief 
  data={analysisResult}
  techData={auditResult}
  parsedData={strategicInsights}
  handoutData={executiveSummary}
  onClose={() => setShowBrief(false)}
/>
```

## 6. Quality Attributes

- **Security**: Presentation-only. All data validation happens in the parent or API layer.
- **Performance**: High performance due to use of Tailwind for styling and minimal client-side logic. Entry animations are lightweight via `framer-motion`.
- **Reliability**: Uses optional chaining (`?.`) extensively to prevent runtime crashes if partial analysis data is missing.
- **Maintainability**: Follows a standard sectioned layout, making it easy to add or remove report modules.

## 7. Reference Information

- **Dependencies**: `framer-motion@^11.0.0`, `lucide-react@latest`.
- **Related Documentation**: [Intelligence Flow Documentation](../intelligence-flow.md)
