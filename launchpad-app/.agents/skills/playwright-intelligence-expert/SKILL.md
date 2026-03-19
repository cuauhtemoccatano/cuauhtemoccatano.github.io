# Playwright Intelligence Expert Skill

Expert standard for implementing high-fidelity web scraping, social audits, and visual DNA extraction using Playwright in the LaunchPad Hub ecosystem.

## Core Philosophy
Playwright is not just for testing; it is our **Visual Context Engine**. It provides the primary data source for our AI Strategic Brain. 

## Technical Standards

### 1. Visual DNA Extraction
Always extract computed styles (`getComputedStyle`) from key interactive elements to identify:
- **Brand Colors**: Sample headers, buttons, and hero sections.
- **Typography Portfolio**: Identify primary and fallback font families.
- **Graphic Style**: Infer style (Minimalist, Brutalist, etc.) based on spacing and border patterns.

### 2. Multi-Page Crawling (The "Pro" Standard)
A single-page audit is insufficient for a professional brief.
- **Discovery**: Automatically identify internal links (origin-matched).
- **Depth**: Audit 3-5 key pages (Home, Services, Contact) to build a holistic Brand Map.
- **Verification**: Check for broken links (non-200 responses) to add value to the "Technical Debt" report.

### 3. Social & Technical Compliance
Always verify:
- **OpenGraph (OG) Tags**: Ensure the site is "Share-Ready".
- **Robots & Sitemap**: Check for search engine configuration foundational health.
- **Tech Stack Identification**: Look for signatures (Next.js, React, Tailwind, WP) to inform the "Suggested Fulfillment" logic.

### 4. Performance Metrics
Capture real-world performance from the browser's perspective:
- **TTFB**: Time to first byte.
- **Total Payload**: DOM size and combined resource weight.
- **Rendering Speed**: Wait for `networkidle` to ensure the audit reflects the user's experience on JS-heavy sites.

## Component Integration
Scraper results should be fed directly into:
1. **Intelligence Dashboard**: For real-time agency analysis.
2. **Client Brief (PDF)**: For high-fidelity, printable evidence.
3. **AI Copilot**: As "Ground Truth" context for blueprint generation.

## Best Practices
- **Headless by Default**: Always run in headless mode for production efficiency.
- **Resource Management**: Always use `try...finally` to ensure `browser.close()` is called, preventing memory leaks on the server.
- **Stealth**: Use common User-Agents to prevent being blocked by basic CDNs.

---
*Version 1.0.0 - LaunchPad Hub Intelligence Specification*
