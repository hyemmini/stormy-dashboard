# 🌊 Stormy Dashboard

[![🌊 Stormy CI](https://github.com/hyemmini/stormy-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/hyemmini/stormy-dashboard/actions/workflows/ci.yml)
[프로덕션 배포 사이트 바로가기](https://hyemmini.github.io/stormy-dashboard/)

> **제조 KPI 및 이슈 추적/분석을 위한 실시간 대시보드**

## 🚀 주요 기능

- **실시간 KPI 대시보드**: 생산성, 품질, 납기 등 주요 KPI 시각화
- **이슈 등록 및 근본 원인 분석**: AI 기반 이슈 분석 플로우
- **반응형 UI & 다크모드**
- **코드 품질 자동화**: ESLint, Prettier, Husky, lint-staged
- **CI/CD 자동화**: GitHub Actions 기반 빌드/테스트/배포

---

## 🛠️ 기술 스택

- **Node.js 18+**
- **Vite** (React + TypeScript)
- **React 18**
- **Tailwind CSS**
- **@tanstack/react-query** (비동기 데이터)
- **Recharts** (KPI 차트)
- **ESLint, Prettier, Husky, lint-staged** (코드 품질)

---

## ⚡️ 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 코드 품질 검사
npm run lint

# 4. 코드 포맷 자동화
npm run format

# 5. 빌드 (배포용)
npm run build
```

---

## 📝 환경 변수

- `.env`, `.env.local` 파일을 루트에 생성 (커밋 금지)
- 예시:
  ```env
  VITE_API_URL=https://api.example.com
  VITE_ENV=development
  ```

---

## 📦 배포 및 CI

- **GitHub Actions**로 자동 빌드/테스트/배포
- 워크플로우: `.github/workflows/ci.yml` 참고
- 배포: GitHub Pages (`/stormy-dashboard/`)
- 배포용 base 경로: [`vite.config.ts`](vite.config.ts) 참고

---

## 📂 주요 스크립트

| 명령어            | 설명               |
| ----------------- | ------------------ |
| `npm run dev`     | 개발 서버 실행     |
| `npm run build`   | 프로덕션 빌드      |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint`    | ESLint 검사        |
| `npm run format`  | Prettier 포맷팅    |

---

## 🧩 기타

- **코드 스타일**: AirBnB + Prettier + TypeScript 규칙
- **커밋 전 검사**: Husky + lint-staged로 자동 실행
- **브라우저 지원**: 최신 2개 버전, 모바일/데스크탑 반응형

---

## 📄 라이선스

MIT
