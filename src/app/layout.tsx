import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "JP이노베이션",
    template: "%s | JP이노베이션",
  },
  description: "제약 바이오 및 이차전지, 석유 정밀화학 플랜트 전문기업 (주)JP이노베이션",
  // 검토용 시안: 검색엔진 색인 제외
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b2f84",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
