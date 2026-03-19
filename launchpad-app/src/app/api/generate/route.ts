import { NextResponse } from "next/server";
import AdmZip from "adm-zip";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      name, 
      schema, 
      pages, 
      primaryColor, 
      secondaryColor, 
      accentColor, 
      font, 
      radius, 
      buttonStyle,
      useGradient,
      useGrain,
      gradientDirection,
      toneOfVoice
    } = data;

    const zip = new AdmZip();
    const safeName = name.toLowerCase().replace(/\s+/g, "-");

    // 1. package.json
    const packageJson = {
      name: safeName,
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      },
      dependencies: {
        next: "14.2.3",
        "react": "^18",
        "react-dom": "^18",
        "@prisma/client": "latest",
        "lucide-react": "latest",
        "clsx": "latest",
        "tailwind-merge": "latest"
      },
      devDependencies: {
        typescript: "^5",
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        postcss: "^8",
        tailwindcss: "^3.4.1",
        autoprefixer: "^10",
        eslint: "^8",
        "eslint-config-next": "14.2.3",
        prisma: "latest",
      },
    };
    zip.addFile("package.json", Buffer.from(JSON.stringify(packageJson, null, 2)));

    // 2. Config Files
    zip.addFile("tsconfig.json", Buffer.from(JSON.stringify({
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./src/*"] }
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"]
    }, null, 2)));

    zip.addFile("next.config.mjs", Buffer.from("/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nexport default nextConfig;"));

    const radiusMap: any = {
      none: "0px",
      sm: "2px",
      md: "6px",
      lg: "12px",
      full: "9999px"
    };

    zip.addFile("tailwind.config.ts", Buffer.from(`import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "${primaryColor}",
          secondary: "${secondaryColor}",
          accent: "${accentColor}",
        },
      },
      borderRadius: {
        brand: "${radiusMap[radius] || "6px"}",
      },
    },
  },
  plugins: [],
};
export default config;
`));

    zip.addFile(".gitignore", Buffer.from(`node_modules\n.next\n.env\n*.log\n.DS_Store`));

    // 3. Prisma Schema
    let prismaSchema = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`;

    if (schema && Array.isArray(schema)) {
      schema.forEach((model: any) => {
        prismaSchema += `\nmodel ${model.name} {\n  id String @id @default(cuid)\n`;
        if (model.fields) {
          model.fields.forEach((field: any) => {
            if (field.name !== "id") {
              prismaSchema += `  ${field.name} ${field.type}\n`;
            }
          });
        }
        prismaSchema += `  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n`;
      });
    }
    zip.addFile("prisma/schema.prisma", Buffer.from(prismaSchema));

    // 4. Lib & Components
    zip.addFile("src/lib/utils.ts", Buffer.from(`import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`));
    
    zip.addFile("src/lib/db.ts", Buffer.from(`import { PrismaClient } from "@prisma/client";\ndeclare global { var prisma: PrismaClient | undefined; }\nexport const db = global.prisma || new PrismaClient();\nif (process.env.NODE_ENV !== "production") global.prisma = db;`));

    zip.addFile("src/components/layout/navbar.tsx", Buffer.from(`
import Link from "next/link";
import { Rocket } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-primary">
          <Rocket className="h-6 w-6" />
          <span>${name}</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-brand-primary transition-colors">Dashboard</Link>
          <Link href="/pricing" className="hover:text-brand-primary transition-colors">Pricing</Link>
        </div>
      </div>
    </nav>
  );
}`));

    zip.addFile("src/components/layout/footer.tsx", Buffer.from(`
export function Footer() {
  return (
    <footer className="border-t py-12 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-zinc-400">© ${new Date().getFullYear()} ${name}. All rights reserved.</p>
      </div>
    </footer>
  );
}`));

    // 5. App Structure & Pages
    zip.addFile("src/app/globals.css", Buffer.from(`@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n  --primary: ${primaryColor};\n}\n\nbody {\n  @apply antialiased text-zinc-900 bg-white;\n}\n\n.btn-brand {\n  @apply px-6 py-3 rounded-brand font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2;\n}\n\n${buttonStyle === "solid" ? ".btn-brand { @apply bg-brand-primary text-white hover:bg-brand-secondary; }" : ""}\n${buttonStyle === "outline" ? ".btn-brand { @apply border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5; }" : ""}\n${buttonStyle === "glass" ? ".btn-brand { @apply bg-white/10 backdrop-blur-md border border-white/20 text-brand-primary hover:bg-white/20; }" : ""}`));

    zip.addFile("src/app/layout.tsx", Buffer.from(`
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Inter } from "next/font/google";

const brandFont = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={brandFont.className}>
        <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}`));

    if (pages && Array.isArray(pages)) {
      pages.forEach((page: any) => {
        const filePath = `src/app${page.path === "/" ? "/page.tsx" : page.path + "/page.tsx"}`;
        let content = "";

        switch (page.template) {
          case "Landing Page":
            content = `
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <main>
      <section className="py-24 px-4 text-center space-y-8">
        <h1 className="text-6xl md:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
          Experience the power of <span className="text-brand-primary">${name}</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          The ${toneOfVoice} solution for modern needs. 
        </p>
        <button className="btn-brand text-lg mx-auto">Get Started <ArrowRight className="h-5 w-5" /></button>
      </section>
    </main>
  );
}`;
            break;

          case "Dashboard":
             content = `
import { LayoutDashboard, Users, Settings } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="w-64 border-r bg-white p-6 space-y-4">
        {[ { label: "Overview", icon: LayoutDashboard }, { label: "Users", icon: Users }, { label: "Settings", icon: Settings } ].map(item => (
          <button key={item.label} className="w-full flex items-center gap-3 px-4 py-2 rounded-brand hover:bg-brand-primary/5 text-zinc-400 font-medium transition-colors">
            <item.icon className="h-4 w-4" /> {item.label}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      </main>
    </div>
  );
}`;
            break;

          case "List View":
            content = `
import { Plus, Search } from "lucide-react";

export default function ListPage() {
  return (
    <div className="p-12 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">${page.name}</h1>
        <button className="btn-brand"><Plus className="h-4 w-4" /> Add New</button>
      </div>
      <div className="bg-white border rounded-brand p-4"><p className="text-zinc-400 italic">No records found.</p></div>
    </div>
  );
}`;
            break;

          case "Pricing Page":
            content = `
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="py-24 max-w-7xl mx-auto text-center space-y-12">
      <h1 className="text-5xl font-black">Simple Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[ { n: "Starter", p: 19 }, { n: "Pro", p: 49 }, { n: "Enterprise", p: 99 } ].map((plan, i) => (
          <div key={plan.n} className={"p-8 rounded-brand border bg-white shadow-sm " + (i === 1 ? "border-brand-primary ring-1 ring-brand-primary" : "")}>
            <h3 className="text-xl font-bold">{plan.n}</h3>
            <p className="text-4xl font-black mt-4">\$ {plan.p} <span className="text-sm font-normal text-zinc-400">/mo</span></p>
            <button className="mt-8 w-full btn-brand">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}`;
            break;

          case "Auth Page":
            content = `
export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md p-8 rounded-brand border bg-white shadow-lg space-y-8">
        <h1 className="text-3xl font-black text-center">Sign In</h1>
        <div className="space-y-4">
          <input className="w-full p-3 rounded-brand border" type="email" placeholder="Email" />
          <input className="w-full p-3 rounded-brand border" type="password" placeholder="Password" />
          <button className="w-full btn-brand mt-4">Continue</button>
        </div>
      </div>
    </div>
  );
}`;
            break;

          case "404 Page":
            content = `
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto">
          <FileQuestion className="h-12 w-12 text-brand-primary" />
        </div>
        <h1 className="text-4xl font-black">404 - Lost in Space</h1>
        <p className="text-zinc-400 max-w-xs mx-auto">The page you're looking for has vanished into the digital void.</p>
        <Link href="/" className="btn-brand inline-flex">Return Home</Link>
      </div>
    </div>
  );
}`;
            break;

          default:
            content = "export default function DefaultPage() { return <div className='p-24 text-center font-bold'>" + page.name + " Placeholder</div> }";
        }

        zip.addFile(filePath, Buffer.from(content));
      });
    }

    // 6. Generate the ZIP
    const zipBuffer = zip.toBuffer();

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=" + safeName + ".zip",
      },
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: "Failed to generate project" }, { status: 500 });
  }
}
