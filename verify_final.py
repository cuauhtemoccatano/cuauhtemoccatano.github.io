from playwright.sync_api import sync_playwright
import subprocess
import time
import os

def run_cuj(page):
    # Start from root
    page.goto("http://localhost:8002")
    page.wait_for_timeout(1000)

    # 1. Tab to show focus (Skip link first, then logo/nav)
    for _ in range(5):
        page.keyboard.press("Tab")
        page.wait_for_timeout(500)

    # 2. Switch language
    page.click("#lang-switch")
    page.wait_for_timeout(1000)

    # 3. Toggle Dark Mode
    # There are two .toggle-icon, use the first one in header
    page.locator(".header .toggle-icon").click()
    page.wait_for_timeout(1500) # Wait for theme transition

    # 4. Open Oracle
    page.click("#oracle-toggle")
    page.wait_for_timeout(1000)

    # 5. Type in Oracle
    page.fill("#oracle-input", "Hello Oracle")
    page.wait_for_timeout(500)
    page.keyboard.press("Enter")
    page.wait_for_timeout(1000)

    # Take final screenshot
    page.screenshot(path="verification/screenshots/final_state.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    if not os.path.exists('verification/videos'):
        os.makedirs('verification/videos')
    if not os.path.exists('verification/screenshots'):
        os.makedirs('verification/screenshots')

    # Start server
    process = subprocess.Popen(['python3', '-m', 'http.server', '8002'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                record_video_dir="verification/videos"
            )
            page = context.new_page()
            try:
                run_cuj(page)
            finally:
                context.close()
                browser.close()
    finally:
        process.terminate()
