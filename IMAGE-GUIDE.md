# 이미지 가이드

## 📸 필요한 이미지 목록

### 1. Favicon & 앱 아이콘

#### `/public/favicon.ico` (32x32 또는 16x16)
- 브라우저 탭에 표시되는 작은 아이콘
- 파란색 계산기 아이콘 또는 "레" 글자
- ICO 형식

#### `/public/apple-touch-icon.png` (180x180)
- iOS 기기에서 홈화면에 추가할 때 사용
- PNG 형식, 투명 배경 없음
- 파란색 배경 + 흰색 계산기 아이콘

### 2. OG 이미지 (SNS 공유용)

#### `/public/og-image.png` (1200x630)
**내용:**
```
배경: 파란색 그라디언트 (좌상단 #3b82f6 → 우하단 #6366f1)

중앙:
- 제목: "평수 계산기" (흰색, 굵게, 크게)
- 부제: "평수와 제곱미터를 쉽게 변환" (흰색, 작게)
- 로고: 계산기 아이콘
- 사이트: www.lerapick.com (작게, 하단)

오른쪽: 간단한 3D 공간 일러스트 (선택사항)
```

### 3. 히어로 이미지 (선택사항)

#### `/public/hero-3d-room.png` (1200x600)
- 메인 페이지 상단에 표시할 3D 공간 렌더링
- 투명한 벽이 있는 방 with 가구 배치
- 깔끔하고 미니멀한 스타일

---

## 🎨 이미지 생성 방법

### 방법 1: Figma로 직접 제작
1. Figma 템플릿 사용
2. 텍스트와 아이콘 배치
3. Export as PNG

### 방법 2: Canva 사용
1. 템플릿 선택
2. 크기 조정 (정확한 픽셀)
3. 다운로드

### 방법 3: AI 이미지 생성
- Midjourney, DALL-E, Stable Diffusion 사용
- 프롬프트 예시:
  ```
  "Modern minimalist calculator icon, blue gradient background, 
  clean design, professional, flat design, simple"
  ```

### 방법 4: 무료 아이콘 사이트
- **Flaticon**: https://www.flaticon.com
- **Icons8**: https://icons8.com
- **Heroicons**: https://heroicons.com

---

## 📐 정확한 이미지 스펙

### Favicon (favicon.ico)
```
크기: 32x32 px (또는 16x16 px)
형식: ICO
색상: 파란색 (#3b82f6) 계산기 아이콘
배경: 투명 또는 흰색
```

### Apple Touch Icon
```
크기: 180x180 px
형식: PNG
색상: 파란색 배경 + 흰색 아이콘
배경: 불투명 (iOS 요구사항)
둥근 모서리: iOS가 자동 처리
```

### OG Image (소셜 미디어용)
```
크기: 1200x630 px (Facebook 권장)
형식: PNG 또는 JPG
최대 용량: 8MB 이하
텍스트: 큼직하고 읽기 쉽게
```

---

## 🎯 간단한 임시 이미지

코드로 임시 이미지를 생성할 수도 있습니다:

### HTML Canvas로 OG 이미지 생성
```html
<!DOCTYPE html>
<html>
<body>
<canvas id="canvas" width="1200" height="630"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 그라디언트 배경
const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#3b82f6');
gradient.addColorStop(1, '#6366f1');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1200, 630);

// 텍스트
ctx.fillStyle = 'white';
ctx.font = 'bold 80px Arial';
ctx.textAlign = 'center';
ctx.fillText('평수 계산기', 600, 280);

ctx.font = '40px Arial';
ctx.fillText('평수와 제곱미터를 쉽게 변환', 600, 350);

ctx.font = '30px Arial';
ctx.fillText('www.lerapick.com', 600, 550);

// 다운로드
const link = document.createElement('a');
link.download = 'og-image.png';
link.href = canvas.toDataURL();
link.click();
</script>
</body>
</html>
```

---

## ✅ 체크리스트

- [ ] favicon.ico 생성 및 /public 폴더에 배치
- [ ] apple-touch-icon.png 생성 및 /public 폴더에 배치
- [ ] og-image.png 생성 및 /public 폴더에 배치
- [ ] 이미지 최적화 (용량 줄이기)
- [ ] 브라우저에서 favicon 확인
- [ ] SNS에서 OG 이미지 미리보기 확인

---

## 🔗 유용한 도구

### 이미지 최적화
- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app

### Favicon 생성
- **Favicon Generator**: https://realfavicongenerator.net
- **Favicon.io**: https://favicon.io

### OG 이미지 테스트
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

---

## 💡 권장사항

1. **간단하게 시작**: 먼저 Favicon만 만들어도 됩니다
2. **AI 활용**: Midjourney나 DALL-E로 빠르게 생성
3. **무료 리소스**: Flaticon에서 계산기 아이콘 다운로드
4. **일관성**: 모든 이미지에 같은 색상 (#3b82f6 파란색) 사용
5. **테스트**: 생성 후 반드시 실제로 확인

---

현재 상태: 이미지 없이도 사이트는 완벽하게 작동하지만, 이미지를 추가하면 전문성이 향상됩니다!
