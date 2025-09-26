import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: "ServiceHub - Найдите надежных исполнителей для любых задач",
  description:
    "Платформа для поиска качественных услуг. Тысячи проверенных исполнителей готовы выполнить вашу задачу быстро и качественно.",
  keywords:
    "услуги, исполнители, заказчики, ремонт, уборка, доставка, репетиторы, сервис, работа",
  authors: [{ name: "ServiceHub Team" }],
  openGraph: {
    title: "ServiceHub - Найдите надежных исполнителей для любых задач",
    description:
      "Платформа для поиска качественных услуг. Тысячи проверенных исполнителей готовы выполнить вашу задачу быстро и качественно.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServiceHub - Найдите надежных исполнителей для любых задач",
    description:
      "Платформа для поиска качественных услуг. Тысячи проверенных исполнителей готовы выполнить вашу задачу быстро и качественно.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-gray-50 text-gray-900`}
        suppressHydrationWarning={true}
      >
        <div id="root" className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
        </div>

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent flash of unstyled content
              (function() {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
