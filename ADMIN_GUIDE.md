# Physics Notes 운영 가이드

이 문서는 Physics Notes 웹사이트 운영자를 위한 가이드입니다.

---

## 목차

1. [프로젝트 구조](#프로젝트-구조)
2. [새 콘텐츠 추가하기](#새-콘텐츠-추가하기)
3. [UI 컴포넌트 사용법](#ui-컴포넌트-사용법)
4. [수식 작성법](#수식-작성법)
5. [스타일 커스터마이징](#스타일-커스터마이징)
6. [배포 및 업데이트](#배포-및-업데이트)
7. [문제 해결](#문제-해결)

---

## 프로젝트 구조

```
physics-notes/
├── index.html              # 메인 페이지
├── about.html              # 사이트 소개
├── css/
│   └── style.css           # 공통 스타일시트
├── js/
│   └── main.js             # JavaScript (다크모드, 검색 등)
├── assets/
│   └── images/             # 이미지 파일
├── templates/
│   └── topic-template.html # 새 주제 작성용 템플릿
├── mechanics/              # 역학
├── electromagnetism/       # 전자기학
├── thermodynamics/         # 열역학
├── quantum/                # 양자역학
├── relativity/             # 상대성이론
├── optics/                 # 광학
└── waves/                  # 파동
```

---

## 새 콘텐츠 추가하기

### 1. 새 주제 페이지 만들기

1. `templates/topic-template.html` 파일을 복사
2. 원하는 분야 폴더에 새 파일로 저장
   - 예: `quantum/wave-function.html`
3. 파일 내용 수정:
   - `<title>` 태그 수정
   - `<h1>` 제목 수정
   - breadcrumb 경로 수정
   - 사이드바 메뉴 수정
   - 본문 내용 작성

### 2. 분야 인덱스에 링크 추가

해당 분야의 `index.html`에 새 페이지 링크 추가:

```html
<li><a href="new-topic.html">새 주제</a></li>
```

### 3. 검색 데이터 업데이트

`js/main.js` 파일의 `searchData` 배열에 새 페이지 추가:

```javascript
{ title: '새 주제', url: 'quantum/new-topic.html', keywords: '관련 키워드들' }
```

---

## UI 컴포넌트 사용법

### 공식 박스

```html
<div class="formula">
    <div class="formula-title">공식 이름</div>
    \[ E = mc^2 \]
    <p>설명 텍스트</p>
</div>
```

### 정의 박스

```html
<div class="definition">
    <div class="definition-title">정의: 용어</div>
    <p>정의 내용</p>
</div>
```

### 예제 박스

```html
<div class="example">
    <div class="example-title">예제 1</div>
    <p><strong>문제:</strong> 문제 내용</p>
    <p><strong>풀이:</strong></p>
    \[ 수식 \]
</div>
```

### 노트/주의 박스

```html
<div class="note">
    <strong>참고:</strong> 주의사항이나 부가 설명
</div>
```

### 카드 (메인 페이지용)

```html
<div class="card">
    <div class="card-icon">&#9881;</div>
    <h3><a href="링크">제목</a></h3>
    <p>설명</p>
</div>
```

#### 카드 아이콘 목록

| 분야 | HTML 코드 | 표시 |
|------|-----------|------|
| 역학 | `&#9881;` | ⚙ |
| 전자기학 | `&#9889;` | ⚡ |
| 열역학 | `&#128293;` | 🔥 |
| 양자역학 | `&#9883;` | ⚛ |
| 상대성이론 | `&#127776;` | 🌠 |
| 광학 | `&#128161;` | 💡 |
| 파동 | `&#127754;` | 🌊 |

---

## 수식 작성법

MathJax를 사용하여 LaTeX 문법으로 수식 작성

### 인라인 수식

```html
에너지는 \( E = mc^2 \) 입니다.
```

### 블록 수식

```html
\[ F = ma \]
```

또는

```html
$$ \nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0} $$
```

### 자주 사용하는 수식 예시

| 수식 | LaTeX 코드 |
|------|-----------|
| 분수 | `\frac{a}{b}` |
| 적분 | `\int_a^b f(x) dx` |
| 미분 | `\frac{d}{dx}` or `\frac{\partial}{\partial x}` |
| 벡터 | `\vec{F}` |
| 그리스 문자 | `\alpha, \beta, \gamma, \omega` |
| 첨자 | `x_i, x^2` |
| 루트 | `\sqrt{x}` |
| 무한대 | `\infty` |

---

## 스타일 커스터마이징

### 색상 변경

`css/style.css`의 `:root` 섹션에서 CSS 변수 수정:

```css
:root {
    --primary-color: #2c3e50;     /* 주 색상 */
    --secondary-color: #3498db;   /* 보조 색상 (링크 등) */
    --accent-color: #e74c3c;      /* 강조 색상 */
    --bg-color: #ffffff;          /* 배경색 */
    --text-color: #333333;        /* 텍스트 색상 */
}
```

### 다크모드 색상 변경

```css
[data-theme="dark"] {
    --primary-color: #ecf0f1;
    --bg-color: #1a1a2e;
    /* ... */
}
```

### 폰트 변경

`<head>` 섹션에서 Google Fonts 링크 변경 후 CSS에서 적용:

```css
body {
    font-family: 'Your Font', sans-serif;
}
```

---

## 배포 및 업데이트

### GitHub Pages 배포

1. 변경사항 커밋:
```bash
git add .
git commit -m "변경 내용 설명"
```

2. 푸시:
```bash
git push origin main
```

3. 1-2분 후 자동 배포 완료

### 배포 URL

```
https://jhseo1211.github.io/web1/
```

### 로컬 테스트

```bash
# Python 사용
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

---

## 문제 해결

### 수식이 렌더링되지 않을 때

1. MathJax 스크립트가 `<head>`에 포함되어 있는지 확인
2. 수식 구문이 올바른지 확인 (`\[`, `\]` 또는 `\(`, `\)`)
3. 브라우저 캐시 삭제 후 새로고침

### 다크모드가 작동하지 않을 때

1. `js/main.js` 파일이 페이지에 포함되어 있는지 확인
2. `<script src="js/main.js"></script>`가 `</body>` 앞에 있는지 확인

### 검색이 작동하지 않을 때

1. `js/main.js`의 `searchData` 배열에 해당 페이지가 등록되어 있는지 확인
2. 브라우저 개발자 도구에서 JavaScript 오류 확인

### 모바일에서 레이아웃이 깨질 때

1. `<meta name="viewport">` 태그가 있는지 확인
2. CSS의 미디어 쿼리 확인 (`@media (max-width: 768px)`)

### 페이지 404 오류

1. 파일 경로와 링크가 일치하는지 확인
2. 파일 이름의 대소문자 확인 (Linux는 대소문자 구분)
3. GitHub에 최신 변경사항이 푸시되었는지 확인

---

## 하위 페이지 UI 업데이트

기존 하위 페이지에 새 UI를 적용하려면 `templates/topic-template.html`의 다음 부분을 복사하여 각 페이지에 적용:

### 1. `<body>` 시작 부분에 추가

```html
<!-- 스크롤 진행 표시바 -->
<div id="scroll-progress"></div>
```

### 2. `<header>` 교체

```html
<header>
    <div class="header-content">
        <h1>
            <a href="../index.html">
                <span class="logo-icon">&#9883;</span>
                Physics Notes
            </a>
        </h1>
        <div class="header-controls">
            <button id="search-toggle" title="검색 (Ctrl+K)">&#128269;</button>
            <button id="dark-mode-toggle" title="다크모드 전환">&#127769;</button>
            <button id="menu-toggle" aria-label="메뉴">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
    <nav><!-- 기존 nav 내용 유지 --></nav>
</header>
```

### 3. `</footer>` 앞에 추가

```html
<!-- 자동 목차 (긴 페이지용) -->
<aside id="toc"></aside>

<!-- 맨 위로 가기 버튼 -->
<button id="back-to-top" title="맨 위로">&#8593;</button>

<!-- 검색 모달 -->
<div id="search-modal">
    <div class="search-container">
        <div class="search-header">
            <h3>&#128269; 검색</h3>
            <button id="search-close">&times;</button>
        </div>
        <input type="text" id="search-input" placeholder="검색어를 입력하세요..." autocomplete="off">
        <div class="search-hint">Tip: Ctrl+K로 검색창을 열 수 있습니다</div>
        <div id="search-results"></div>
    </div>
</div>
```

### 4. `</body>` 앞에 스크립트 추가

```html
<script src="../js/main.js"></script>
```

---

## 유용한 팁

1. **이미지 최적화**: 큰 이미지는 압축하여 로딩 속도 개선
2. **정기 백업**: 중요한 변경 전에 브랜치 생성
3. **미리보기**: 배포 전 로컬에서 테스트
4. **접근성**: alt 텍스트, 적절한 색상 대비 유지

---

문의사항이 있으면 GitHub Issues를 이용해주세요.
