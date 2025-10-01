# 🔍 Google & Naver 웹마스터 등록 가이드

## 📝 단계별 가이드

### 1️⃣ Google Search Console 등록

#### Step 1: Google Search Console 접속
1. https://search.google.com/search-console 접속
2. Google 계정으로 로그인

#### Step 2: 속성 추가
1. "속성 추가" 클릭
2. **URL 접두어** 선택
3. `https://www.lerapick.com` 입력

#### Step 3: 소유권 확인
1. **HTML 태그** 방법 선택
2. 메타 태그 복사 (예시):
   ```html
   <meta name="google-site-verification" content="abc123def456ghi789..." />
   ```

#### Step 4: 메타 태그 추가
1. `/pages/_document.js` 파일 열기
2. 주석 처리된 부분 찾기:
   ```javascript
   {/* <meta name="google-site-verification" content="여기에-구글-코드-붙여넣기" /> */}
   ```
3. 주석 제거하고 content 값 변경:
   ```javascript
   <meta name="google-site-verification" content="abc123def456ghi789..." />
   ```

#### Step 5: 배포 및 확인
1. 코드 저장 및 배포
2. Google Search Console에서 "확인" 버튼 클릭
3. ✅ "소유권이 확인되었습니다" 메시지 확인

---

### 2️⃣ Naver 웹마스터 도구 등록

#### Step 1: Naver 웹마스터 접속
1. https://searchadvisor.naver.com 접속
2. Naver 계정으로 로그인

#### Step 2: 사이트 등록
1. "사이트 추가" 클릭
2. `https://www.lerapick.com` 입력

#### Step 3: 소유권 확인
1. **HTML 태그** 방법 선택
2. 메타 태그 복사 (예시):
   ```html
   <meta name="naver-site-verification" content="xyz789abc123def456..." />
   ```

#### Step 4: 메타 태그 추가
1. `/pages/_document.js` 파일 열기
2. 주석 처리된 부분 찾기:
   ```javascript
   {/* <meta name="naver-site-verification" content="여기에-네이버-코드-붙여넣기" /> */}
   ```
3. 주석 제거하고 content 값 변경:
   ```javascript
   <meta name="naver-site-verification" content="xyz789abc123def456..." />
   ```

#### Step 5: 배포 및 확인
1. 코드 저장 및 배포
2. Naver 웹마스터에서 "소유권 확인" 버튼 클릭
3. ✅ "소유권 확인 완료" 메시지 확인

---

## 📍 메타 태그 위치

### `/pages/_document.js`
```javascript
<Head>
  <meta charSet="utf-8" />
  <meta name="theme-color" content="#3b82f6" />
  
  {/* 소유권 확인 메타 태그 */}
  <meta name="google-site-verification" content="YOUR_GOOGLE_CODE" />
  <meta name="naver-site-verification" content="YOUR_NAVER_CODE" />
  
  {/* 나머지 메타 태그... */}
</Head>
```

---

## 🗺️ Sitemap 제출

### Google Search Console

#### Step 1: Sitemap 제출
1. 좌측 메뉴 → "Sitemaps" 클릭
2. "새 사이트맵 추가"에 입력:
   ```
   https://www.lerapick.com/sitemap.xml
   ```
3. "제출" 클릭

#### Step 2: 확인
- 상태가 "성공"으로 표시되면 완료 ✅
- 색인 생성까지 며칠~몇 주 소요

### Naver 웹마스터

#### Step 1: Sitemap 제출
1. "요청" → "사이트맵 제출" 클릭
2. Sitemap URL 입력:
   ```
   https://www.lerapick.com/sitemap.xml
   ```
3. "확인" 클릭

#### Step 2: RSS 제출 (선택사항)
- 블로그가 있다면 RSS도 제출 가능
- 현재는 Skip

---

## 🤖 robots.txt 확인

### 확인 방법
```
https://www.lerapick.com/robots.txt
```

브라우저에서 접속하여 다음 내용 확인:
```
User-agent: *
Allow: /
Sitemap: https://www.lerapick.com/sitemap.xml
```

---

## 📊 색인 상태 확인

### Google Search Console
1. "개요" 메뉴에서 색인 생성 페이지 수 확인
2. "URL 검사" 도구로 개별 페이지 확인 가능

### Naver 웹마스터
1. "통계" → "검색 노출" 확인
2. 수집 상태 모니터링

---

## ⏱️ 예상 소요 시간

| 단계 | Google | Naver |
|------|--------|-------|
| 소유권 확인 | 즉시 | 즉시 |
| Sitemap 제출 | 즉시 | 즉시 |
| 색인 시작 | 1-3일 | 1-7일 |
| 완전 색인 | 1-4주 | 2-4주 |

---

## ✅ 체크리스트

### 등록 전
- [ ] 사이트 배포 완료
- [ ] 도메인 연결 완료 (www.lerapick.com)
- [ ] Sitemap 접근 가능 확인
- [ ] Robots.txt 접근 가능 확인

### Google Search Console
- [ ] 계정 생성/로그인
- [ ] 속성 추가
- [ ] 메타 태그 추가 (_document.js)
- [ ] 배포
- [ ] 소유권 확인
- [ ] Sitemap 제출
- [ ] URL 검사로 메인 페이지 색인 요청

### Naver 웹마스터
- [ ] 계정 생성/로그인
- [ ] 사이트 등록
- [ ] 메타 태그 추가 (_document.js)
- [ ] 배포
- [ ] 소유권 확인
- [ ] Sitemap 제출

---

## 🎯 등록 후 해야 할 일

### 1. URL 색인 요청
**Google:**
- URL 검사 → "색인 생성 요청"
- 주요 페이지 모두 요청

**Naver:**
- "요청" → "URL 수집 요청"
- 최대 500개 URL

### 2. 주간 모니터링
- 색인된 페이지 수 확인
- 검색어 노출 확인
- 오류 확인 및 수정

### 3. 콘텐츠 최적화
- 검색어 순위 확인
- 클릭률(CTR) 개선
- 메타 설명 최적화

---

## 🚨 문제 해결

### 소유권 확인 실패
- 메타 태그가 `<head>` 안에 있는지 확인
- 배포가 완료되었는지 확인
- 브라우저에서 페이지 소스 보기로 메타 태그 존재 확인

### Sitemap 오류
- Sitemap URL 접근 가능한지 확인
- XML 형식 오류 없는지 확인
- HTTPS 사용하는지 확인

### 색인이 안될 때
- robots.txt에서 차단하고 있지 않은지 확인
- 페이지가 실제로 접근 가능한지 확인
- noindex 태그가 없는지 확인

---

## 📞 도움말 링크

- **Google Search Console 고객센터**: https://support.google.com/webmasters
- **Naver 웹마스터 가이드**: https://searchadvisor.naver.com/guide

---

## 🎉 완료!

등록이 완료되면:
1. ✅ Google에서 "site:www.lerapick.com" 검색
2. ✅ Naver에서 "site:www.lerapick.com" 검색
3. ✅ 색인된 페이지 확인

**색인 시작까지는 시간이 걸리니 인내심을 가지세요!**
