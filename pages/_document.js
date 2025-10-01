import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="레라픽 평수 계산기" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "레라픽 평수 계산기",
              "url": "https://www.lerapick.com",
              "description": "평수와 제곱미터를 쉽게 변환하고 3D로 공간을 확인할 수 있는 무료 평수 계산기",
              "applicationCategory": "UtilityApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "featureList": [
                "평수 계산",
                "제곱미터 변환",
                "3D 공간 시각화",
                "평당 가격 계산"
              ]
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
