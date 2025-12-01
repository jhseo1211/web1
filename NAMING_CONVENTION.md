# HTML 문서 명명 규칙 (Naming Convention)

## 1. 기본 규칙

| 규칙 | 설명 | 예시 |
|------|------|------|
| 소문자만 사용 | 대문자 금지 | `kinematics.html` ✓ |
| 단어 구분: 하이픈(-) | 언더스코어, 공백 금지 | `angular-momentum.html` ✓ |
| 영문 사용 | 한글 파일명 금지 | `thermodynamics.html` ✓ |
| 확장자: .html | 일관된 확장자 | `energy.html` ✓ |

---

## 2. 파일명 구조

```
[번호]-[주제영문명].html
```

| 구성요소 | 설명 | 예시 |
|----------|------|------|
| **번호** | 2자리 순서 번호 | `01`, `02`, `03` |
| **주제명** | 영문 소문자, 하이픈 구분 | `newtons-laws` |

---

## 3. 번호 부여 기준

```
01-09: 기초 개념
10-19: 핵심 이론
20-29: 응용/심화
30-39: 예제/문제
40-49: 실험/실습
90-99: 부록/참고자료
```

---

## 4. 특수 파일명

| 파일명 | 용도 |
|--------|------|
| `index.html` | 각 분야 메인/개요 페이지 |
| `00-overview.html` | 상세 개요 (index가 간단할 때) |
| `99-references.html` | 참고자료 모음 |
| `appendix-[주제].html` | 부록 |

---

## 5. 분야별 폴더 구조 예시

```
physics-notes/
├── index.html                  ← 메인 페이지
├── about.html                  ← 소개 페이지
│
├── mechanics/                  ← 역학
│   ├── index.html             ← 분야 개요
│   ├── 01-kinematics.html     ← 운동학
│   ├── 02-dynamics.html       ← 동역학
│   ├── 03-energy-work.html    ← 에너지와 일
│   ├── 04-momentum.html       ← 운동량
│   └── 05-rotation.html       ← 회전운동
│
├── quantum/                    ← 양자역학
│   ├── index.html
│   ├── 01-wave-function.html
│   ├── 02-schrodinger-equation.html
│   └── ...
│
├── particle-physics/           ← 입자물리
├── astronomy/                  ← 천문학
├── engineering/                ← 공학
├── recent/                     ← 최근관심
├── uncategorized/              ← 미분류
│
├── css/                        ← 스타일시트
├── js/                         ← 자바스크립트
└── templates/                  ← 템플릿
```

---

## 6. 피해야 할 패턴

| ❌ 잘못된 예시 | ✓ 올바른 예시 | 이유 |
|---------------|---------------|------|
| `Newton's Laws.html` | `01-newtons-laws.html` | 공백, 대문자, 특수문자 |
| `운동학.html` | `01-kinematics.html` | 한글 파일명 |
| `chapter1.html` | `01-kinematics.html` | 내용 파악 불가 |
| `energy_and_work.html` | `03-energy-work.html` | 언더스코어 사용 |
| `schrödingerEq.html` | `02-schrodinger-equation.html` | 특수문자, camelCase |

---

## 7. 새 문서 추가 절차

1. **파일명 결정**
   - 번호 확인 (해당 폴더의 마지막 번호 + 1)
   - 영문 주제명 작성

2. **템플릿 복사**
   ```bash
   cp templates/topic-template.html [분야]/[번호]-[주제명].html
   ```

3. **내용 수정**
   - `<title>` 수정
   - `<h1>` 수정
   - 사이드바 목차에 추가
   - 이전/다음 페이지 링크 설정

4. **검색 데이터 업데이트**
   - `js/main.js`의 `searchData` 배열에 추가

5. **커밋 및 푸시**
   ```bash
   git add .
   git commit -m "Add [주제명] to [분야]"
   git push
   ```

---

## 8. 현재 파일 목록

### mechanics/
- `index.html` - 역학 개요
- `01-kinematics.html` - 운동학
- `02-dynamics.html` - 동역학
- `03-energy-work.html` - 에너지와 일

### 기타 분야
- 각 분야별 `index.html` 존재
- 세부 문서는 추가 예정

---

*Last updated: 2025*
