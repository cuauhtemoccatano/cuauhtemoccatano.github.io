# 💎 LaunchPad Agency Hub (v0.2.5-stable)

LaunchPad is a high-fidelity, high-end white-label builder platform designed for modern marketing agencies. It transforms the project setup phase into a strategic branding experience, powered by a local, private intelligence engine.

---

## 🚀 Key Features (v0.2.5)

- **Deep Intelligence 1.0**: A progressive analysis engine that performs technical scraping, technical audits (SquirrelScan), and LLM-powered strategic SWOT analysis for any website.
- **Creative Director AI 2.0**: Integrated "Blueprint" skills. The AI can now propose entire software architectures (pages and data models) based on business types.
- **Bilingual Interface**: Full native support for **English** and **Spanish**, covering the entire project provisioning workflow.
- **Starter Blueprints**: Pre-defined templates for **SaaS Pro**, **Modern Commerce**, **Dashboard Engine**, and **Marketing Edge**.
- **Appearance Studio**: Persistent themes (Light, Dark, System) and custom application wallpapers (**Arctic Aurora**, **Midnight Deep**, **Cosmic Mesh**) for a premium macOS desktop feel.
- **Identity Studio**: Deep visual architecture system with real-time preview, multi-color support, and architectural reflow.
- **Robust Generator**: Backend engine that produces a comprehensive white-label Next.js codebase with Prisma models and branding pre-configured.
- **Professional Suite**: 19+ automated unit tests ensuring stability in AI parsing, UI components, and code generation.

---

## 📚 Documentation

Detailed technical documentation is available in the [`/docs`](./docs) directory:

- **[Intelligence Flow](./docs/intelligence-flow.md)**: Understanding the progressive analysis and LLM orchestration.
- **[Component Documentation](./docs/components)**: Standardized documentation for core React components.
  - [ClientBrief Documentation](./docs/components/client-brief-documentation.md)

---

## 📂 Project Structure & Paths

**Project Root**: `/Users/macos/.gemini/antigravity/scratch/launchpad-builder`

### Directory Tree
```text
launchpad-builder/
├── electron/              # Desktop Bridge (main.cjs)
├── public/                # Static Assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API Routes (Generate, Creative Director)
│   │   ├── projects/      # Project Creation Wizard
│   │   ├── settings/      # Appearance & Application Settings
│   │   └── templates/     # Industry Blueprints
│   ├── components/
│   │   ├── builder/       # Core Builder Engine (AI Copilot, Live Preview)
│   │   ├── layout/        # Sidebar & Navigation
│   │   └── ui/            # Reusable Design System
│   ├── lib/               # Shared Utilities & Translations
│   └── test/              # Test Setup
├── next.config.mjs        # Next.js Configuration
├── package.json           # Dependencies & System Metadata
└── vitest.config.ts       # Testing Configuration
```

| Path | Description |
| :--- | :--- |
| `src/app/` | Core Next.js Application (Routes, API, Layouts) |
| `src/app/api/generate/` | **Code Generator Engine**: Logic for ZIP creation and file templates. |
| `src/app/api/creative-director/` | **Intelligence Bridge**: Local Ollama integration for AI skills. |
| `src/app/templates/` | **Blueprint Gallery**: Starting point for common industry projects. |
| `src/components/builder/` | **Builder Core**: Interactive components for the Wizard and Preview. |
| `src/components/ui/` | **Design System**: Atomic React components (Buttons, Inputs, etc.). |
| `src/lib/` | **Utilities**: `cn` merger, translations (EN/ES), and shared logic. |
| `electron/` | **Desktop Bridge**: Main process files (`main.cjs`) for the macOS window. |
| `public/` | Static assets and imagery. |

---

## 🛠️ Operations & Setup

### 1. Initialization
Go to directory:
```bash
.gemini/antigravity/scratch/launchpad-builder
```

Ensure all dependencies are installed:
```bash
npm install
```

### 2. Development & Execution
Launch the web-based dev server:
```bash
npm run dev
```

Launch the high-fidelity Desktop Experience (macOS Native):
```bash
npm run desktop
```

### 3. Build & Production
Prepare the application for production:
```bash
npm run build
```

### 4. Testing & Quality Assurance
Run the unit testing suite (Vitest):
```bash
npm test          # CLI mode
npm run test:ui   # Interactive UI mode
```

---

## 🧠 Intelligence Engine (Ollama)

LaunchPad requires **Ollama** running locally for the "Creative Director" features:

1.  **Install Ollama**: Download from [Ollama.com](https://ollama.com).
2.  **Pull the Model**:
    ```bash
    ollama run llama3
    ```
3.  **Tethering**: LaunchPad will automatically detect the local instance on port 11434.

---

## ⚙️ Technical Specifications

- **Framework**: Next.js 14 (App Router)
- **Module System**: Full **ESM** project with a **CommonJS Bridge** for Electron compatibility.
- **Styling**: Tailwind CSS with custom **Glassmorphism** engine and CSS Variable-based Theming.
- **Database Logic**: Dynamic **Prisma Schema** generation based on AI Blueprints.
- **Images**: Remote pattern support for `images.unsplash.com` (configured in `next.config.mjs`).
- **Testing**: **Vitest** + **Happy-DOM** for high-speed, headless component testing.
- **Persistance**: LocalStorage-based sync for appearance settings and cross-window themes.

---

## 🔒 Privacy & Sovereignty
LaunchPad is **Privacy-First**. All strategic brainstorming, client data, and provisioning logic happens **locally on your hardware**. No data is ever sent to external cloud AI servers, ensuring total intellectual property sovereignty for your agency.
