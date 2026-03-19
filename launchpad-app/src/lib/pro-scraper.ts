import { chromium, type Page, type Response } from "playwright";

export interface ScrapeResult {
  metrics: {
    score: number;
    ttfb: string;
    size: string;
    seo: string;
    pageCount: number;
    brokenLinks: number;
    securityScore: number;
  };
  context: {
    title: string;
    description: string;
    colors: string[];
    fonts: string[];
    headings: string[];
    bodyText: string;
    screenshot?: string; // base64
    pagesCrawled: string[];
    ogTags: Record<string, string>;
    techStack: string[];
    siteMap: boolean;
    robots: boolean;
    brokenUrls: string[];
  };
}

async function extractPageData(page: Page) {
  return await page.evaluate(() => {
    const colors = new Set<string>();
    const fonts = new Set<string>();
    
    // 1. Extract Visuals
    const elements = document.querySelectorAll("h1, h2, button, a, [class*='hero'], [id*='hero'], header, nav");
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const bgColor = style.backgroundColor;
      if (color && !color.includes("rgba(0, 0, 0, 0)") && color !== "rgb(0, 0, 0)") colors.add(color);
      if (bgColor && !bgColor.includes("rgba(0, 0, 0, 0)") && bgColor !== "rgb(255, 255, 255)") colors.add(bgColor);
      const fontFamily = style.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
      if (fontFamily && fontFamily.length > 3) fonts.add(fontFamily);
    });

    // 2. Extract Headings
    const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
      .slice(0, 5)
      .map(el => el.textContent?.trim() || "")
      .filter(t => t.length > 0);

    // 3. Extract Body Text
    const bodyText = Array.from(document.querySelectorAll("p"))
      .slice(0, 5)
      .map(p => p.textContent?.trim())
      .join(" ")
      .substring(0, 1000);

    // 4. Tech Stack Hints
    const techHints: string[] = [];
    if (document.querySelector('meta[name="next-head-count"]')) techHints.push("Next.js");
    if (document.querySelector('script[src*="react"]')) techHints.push("React");
    if (document.querySelector('div[id="__next"]')) techHints.push("Next.js");
    if (document.querySelector('div[id="app"]')) techHints.push("Vue/SPA");
    if (document.querySelector('link[href*="tailwind"]')) techHints.push("TailwindCSS");
    if (document.querySelector('meta[content*="WordPress"]')) techHints.push("WordPress");

    return {
      colors: Array.from(colors),
      fonts: Array.from(fonts),
      headings,
      bodyText,
      techHints
    };
  });
}

export async function scrapePro(url: string, options: { maxPages?: number, isLight?: boolean, recursive?: boolean } = {}): Promise<ScrapeResult> {
  const { maxPages: limit = 5, isLight = false, recursive = false } = options;
  const maxPages = recursive ? Math.min(limit, 50) : limit; // Cap recursive at 50 for safety
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    viewport: { width: 1440, height: 900 },
  });
  
  const pagesVisited = new Set<string>();
  const queue: string[] = [url];
  const allHeadings: string[] = [];
  const allColors = new Set<string>();
  const allFonts = new Set<string>();
  const allTech = new Set<string>();
  let combinedBodyText = "";
  const brokenUrls = new Set<string>();
  
  let mainTitle = "";
  let mainDescription = "";
  let mainScreenshot = "";
  let ogTags: Record<string, string> = {};
  let firstPageTtfb = 0;
  let firstPageSize = 0;
  let hasRobots = false;
  let hasSitemap = false;

  try {
    const domain = new URL(url).origin;
    const page = await context.newPage();

    // 1. Initial Checks (Robots/Sitemap)
    if (!isLight) {
        try {
            const robotsRes = await page.goto(`${domain}/robots.txt`, { timeout: 3000 }).catch(() => null);
            hasRobots = !!(robotsRes && robotsRes.ok());
            const sitemapRes = await page.goto(`${domain}/sitemap.xml`, { timeout: 3000 }).catch(() => null);
            hasSitemap = !!(sitemapRes && sitemapRes.ok());
        } catch(e) {}
    }

    // 2. BFS Crawl Loop
    // Use a lightweight context for subsequent pages to save RAM
    const crawlContext = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        viewport: { width: 800, height: 600 },
    });
    // Resource Guard: Block media on ALL pages except first if screenshot is needed
    await crawlContext.route('**/*.{png,jpg,jpeg,gif,svg,webp,mp4,woff,woff2,ttf}', route => route.abort());
    const crawlPage = await crawlContext.newPage();

    while (queue.length > 0 && pagesVisited.size < maxPages) {
        const currentUrl = queue.shift()!;
        if (pagesVisited.has(currentUrl)) continue;

        try {
            const isFirst = pagesVisited.size === 0;
            const targetPage = isFirst ? page : crawlPage;
            
            const start = Date.now();
            const response = await targetPage.goto(currentUrl, { 
                waitUntil: isFirst ? "networkidle" : "domcontentloaded", 
                timeout: 30000 
            });
            
            if (isFirst) {
                firstPageTtfb = Date.now() - start;
                mainTitle = (await targetPage.title()) || "Untitled";
                mainDescription = await targetPage.$eval('meta[name="description"]', (el) => el.getAttribute("content")).catch(() => "") || "";
                
                // OG Tags
                ogTags = await targetPage.evaluate(() => {
                    const tags: Record<string, string> = {};
                    document.querySelectorAll('meta[property^="og:"]').forEach(el => {
                        const prop = el.getAttribute("property") || "";
                        const content = el.getAttribute("content") || "";
                        if (prop) tags[prop.replace("og:", "")] = content;
                    });
                    return tags;
                });

                if (!isLight) {
                    mainScreenshot = await targetPage.screenshot({ type: "jpeg", quality: 70 }).then(buf => buf.toString("base64"));
                }
                firstPageSize = (await targetPage.content()).length / 1024;
            }

            if (!response || !response.ok()) {
                if (!isFirst) brokenUrls.add(currentUrl);
            } else {
                const data = await extractPageData(targetPage);
                data.headings.forEach(h => allHeadings.push(h));
                data.colors.forEach(c => allColors.add(c));
                data.fonts.forEach(f => allFonts.add(f));
                data.techHints.forEach(t => allTech.add(t));
                if (combinedBodyText.length < 5000) combinedBodyText += data.bodyText + " ";
                
                // Discover new links for BFS if recursive
                if (recursive && pagesVisited.size < maxPages) {
                    const links = await targetPage.$$eval("a", (anchors, base) => {
                        return anchors
                            .map(a => (a as HTMLAnchorElement).href)
                            .filter(href => href.startsWith(base) && !href.includes("#") && !href.includes("mailto:"));
                    }, domain);
                    
                    for (const link of links) {
                        const cleanLink = link.split('#')[0].replace(/\/$/, "");
                        if (!pagesVisited.has(cleanLink) && !queue.includes(cleanLink)) {
                            queue.push(cleanLink);
                        }
                    }
                }
            }
            pagesVisited.add(currentUrl.replace(/\/$/, ""));
        } catch (e) {
            brokenUrls.add(currentUrl);
            pagesVisited.add(currentUrl); // Mark as visited even if failed
        }
    }

    await crawlContext.close();

    return {
      metrics: {
        score: firstPageTtfb > 1500 ? 55 : 94,
        ttfb: `${firstPageTtfb}ms`,
        size: `${firstPageSize.toFixed(2)}KB`,
        seo: brokenUrls.size > 0 ? "SEO Alert: Broken Links" : "High-Performance Build",
        pageCount: pagesVisited.size,
        brokenLinks: brokenUrls.size,
        securityScore: (hasRobots ? 50 : 0) + (Object.keys(ogTags).length > 2 ? 50 : 20)
      },
      context: {
        title: mainTitle,
        description: mainDescription,
        colors: Array.from(allColors).slice(0, 8),
        fonts: Array.from(allFonts).slice(0, 4),
        headings: Array.from(new Set(allHeadings)).slice(0, 15),
        bodyText: combinedBodyText.substring(0, 5000).replace(/\s+/g, ' '),
        screenshot: mainScreenshot ? `data:image/jpeg;base64,${mainScreenshot}` : undefined,
        pagesCrawled: Array.from(pagesVisited),
        ogTags,
        techStack: Array.from(allTech),
        siteMap: hasSitemap,
        robots: hasRobots,
        brokenUrls: Array.from(brokenUrls)
      }
    };

  } finally {
    await browser.close();
  }
}
