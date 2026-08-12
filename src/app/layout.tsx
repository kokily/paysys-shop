import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/theme/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://paysys.kr"),
  title: "행사전표시스템",
  description: "행사전표시스템",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/logo192.png" }],
  },
  openGraph: {
    title: "행사전표시스템",
    description: "행사전표시스템",
    url: "https://paysys.kr",
    siteName: "행사전표시스템",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/logo512.png",
        width: 512,
        height: 512,
        alt: "행사전표시스템",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "행사전표시스템",
    description: "행사전표시스템",
    images: ["/logo512.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" suppressHydrationWarning className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
