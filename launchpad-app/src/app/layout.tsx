import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/components/providers/client-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LaunchPad Hub",
  description: "Next-gen builder for agency-scale software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
