import type { Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/SessionProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | InfoGrab',
    default: 'InfoGrab - 개발자 성향 설문',
  },
  description: '나와 가장 잘 맞는 개발 스타일은? 10가지 질문으로 알아보는 나의 개발자 성향 테스트. 프론트엔드부터 백엔드까지, 당신에게 가장 적합한 개발 분야를 찾아보세요.',
  keywords: ['개발자 테스트', '개발자 성향', '프론트엔드', '백엔드', '개발자', '개발 스타일', '개발자 커리어', '프로그래밍 성향'],
  authors: [{ name: '이주형' }],
  creator: '이주형',
  publisher: '이주형',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '개발자 성향 설문조사',
    description: '12가지 질문으로 알아보는 나의 개발자 성향! 설문에 참여하고 나의 개발 스타일을 파악해보세요.',
    url: 'http://igfetest-ljh.vercel.app',
    siteName: '개발자 성향 설문조사',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '개발자 성향 설문조사',
    description: '12가지 질문으로 알아보는 나의 개발자 성향! 설문에 참여하고 나의 개발 스타일을 파악해보세요.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="canonical" href="http://igfetest-ljh.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
