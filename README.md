# 🌊 Stormy Dashboard

![🌊 Stormy CI](https://github.com/hmjjang93/stormy-dashboard/actions/workflows/ci.yml/badge.svg)

## 제조 KPI 및 이슈 추적/분석을 위한 실시간 대시보드 프로젝트입니다.

## 🚀 주요 기능

- **실시간 KPI 대시보드**: 생산성, 품질, 납기 등 주요 KPI 시각화
- **이슈 등록 및 근본 원인 분석**: AI 기반 이슈 분석 플로우
- **반응형 UI & 다크모드**
- **CI/CD 자동화**: GitHub Actions 기반 빌드/테스트
- **코드 품질 자동화**: ESLint, Prettier, Husky, lint-staged

---

## 🛠️ 개발 환경

- **Node.js 18+**
- **Vite**
- **React 18 + TypeScript**
- **Tailwind CSS**
- **ESLint, Prettier, Husky, lint-staged**

---

## ⚡️ 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 코드 품질 검사 (커밋 전 자동 실행)
npm run lint
```

---

## 📝 환경 변수

- `.env`, `.env.local` 파일을 루트에 생성 (커밋 금지)
- 예시:
  ```
  VITE_API_URL=https://api.example.com
  VITE_ENV=development
  ```

---

## 📦 배포 및 CI

- **GitHub Actions**로 자동 빌드/테스트
- 배포 워크플로우는 `.github/workflows/ci.yml` 참고

---

## 📄 라이선스

MIT

---
