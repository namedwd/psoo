import Head from 'next/head';

export default function SEO({ 
  title = "평수 계산기 - 평수 변환, 3D 공간 시각화 | 레라픽",
  description = "평수를 제곱미터로 변환하고 3D로 공간을 확인하세요. 평당 가격 계산, 가로세로 계산 등 모든 평수 관련 기능을 무료로 제공합니다.",
  canonical = "https://www.lerapick.com",
  ogImage = "https://www.lerapick.com/og-image.png",
  keywords = "평수 계산기, 평수 계산, 제곱미터 계산, 평수 변환, 평당 가격, 분양면적, 전용면적, 3D 공간 시각화"
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    </Head>
  );
}
