# Physics Notes - 물리학 공부 노트

물리학 공부 내용을 체계적으로 정리하고 공유하는 웹사이트입니다.

## 프로젝트 구조

```
physics-notes/
├── index.html              # 메인 페이지
├── about.html              # 사이트 소개
├── css/
│   └── style.css           # 공통 스타일시트
├── assets/
│   └── images/             # 이미지 파일
├── templates/
│   └── topic-template.html # 새 주제 작성용 템플릿
├── mechanics/              # 역학
│   ├── index.html          # 역학 개요
│   ├── kinematics.html     # 운동학
│   ├── dynamics.html       # 동역학
│   └── energy.html         # 에너지와 일
├── electromagnetism/       # 전자기학
├── thermodynamics/         # 열역학
├── quantum/                # 양자역학
├── relativity/             # 상대성이론
├── optics/                 # 광학
└── waves/                  # 파동
```

## 분야별 목차

- **역학 (Mechanics)**: 운동학, 동역학, 에너지와 일
- **전자기학 (Electromagnetism)**: 정전기학, 자기학, 맥스웰 방정식
- **열역학 (Thermodynamics)**: 열역학 법칙, 엔트로피
- **양자역학 (Quantum Mechanics)**: 파동함수, 슈뢰딩거 방정식
- **상대성이론 (Relativity)**: 특수/일반 상대성이론
- **광학 (Optics)**: 기하광학, 파동광학
- **파동 (Waves)**: 파동의 성질, 음파

## 기능

- MathJax를 사용한 LaTeX 수식 렌더링
- 반응형 웹 디자인 (모바일/PC 대응)
- 다크모드 지원 (시스템 설정 따름)
- 확장 가능한 구조

## 새 콘텐츠 추가 방법

1. `templates/topic-template.html` 파일을 복사
2. 원하는 분야 폴더에 새 파일로 저장 (예: `mechanics/momentum.html`)
3. 파일 내 주석을 참고하여 내용 수정
4. 해당 분야의 index.html에 링크 추가

## 사용된 기술

- HTML5 / CSS3
- MathJax 3.x (수식 렌더링)
- Google Fonts (Noto Sans KR)

## 로컬에서 실행

별도의 서버 설정 없이 `index.html`을 브라우저에서 직접 열어볼 수 있습니다.

```bash
# Python 3를 이용한 간단한 로컬 서버
python -m http.server 8000

# 또는 Node.js의 serve 패키지
npx serve
```

## 라이선스

개인 학습 목적으로 작성되었습니다.
