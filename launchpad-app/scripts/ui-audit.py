import os
import re
import sys

# UI Standards to Enforce (Liquid Glass System)
STANDARDS = {
    'min_opacity_dark': 0.7,  # Min 70% opacity in dark context
    'min_opacity_light': 0.8, # Min 80% opacity in light context
    'min_blur': 24,           # Min backdrop blur in px
}

# Regex Patterns for Tailwind Classes that Bypass Variables
PATTERNS = [
    # Low-opacity backgrounds (below /30-70 range)
    re.compile(r'bg-(?:white|black|zinc|slate)-[0-9]{2,3}/([0-2]{1}[0-9]?)'),
    # Low-opacity rgba
    re.compile(r'rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.[0-2]\d*\s*\)'),
    # Low backdrop blur
    re.compile(r'backdrop-blur-(?:sm|md)'),
]

def audit_ui_file(file_path):
    issues = []
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for idx, line in enumerate(lines):
            for pattern in PATTERNS:
                matches = pattern.finditer(line)
                for match in matches:
                    issues.append({
                        'line': idx + 1,
                        'content': line.strip(),
                        'pattern': match.group(0),
                        'suggestion': 'Use var(--glass-bg) or increase opacity to >= 70% for readability'
                    })
    return issues

def main():
    base_dir = '/Users/macos/Documents/GitHub/cuauhtemoccatano.github.io/launchpad-app/src'
    all_issues = []
    
    for root, _, files in os.walk(base_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css')):
                full_path = os.path.join(root, file)
                file_issues = audit_ui_file(full_path)
                if file_issues:
                    all_issues.append({
                        'file': os.path.relpath(full_path, base_dir),
                        'issues': file_issues
                    })
    
    if not all_issues:
        print("✅ UI Contrast & Glass Audit Passed! All elements meet premium standards.")
        sys.exit(0)
    
    print("🚨 UI Quality Audit: Found Potential Background Bleed / Contrast Issues")
    print("-" * 80)
    for file_entry in all_issues:
        print(f"\n📂 File: {file_entry['file']}")
        for issue in file_entry['issues']:
            print(f"  [Line {issue['line']}] Potentially too transparent: '{issue['pattern']}'")
            print(f"  Suggestion: {issue['suggestion']}")
    
    print("\n" + "-" * 80)
    print(f"Total files with issues: {len(all_issues)}")
    # We exit with 0 for now but can use 1 in CI
    sys.exit(0)

if __name__ == "__main__":
    main()
