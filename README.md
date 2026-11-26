# Jinmin Kim: Blog

김진민(Jinmin Kim)의 개인 연구 웹사이트 소스다. 연구 노트, 프로젝트 기록, 논문 리뷰를 싣는다.
[Astro](https://astro.build/)로 만든 정적 사이트. GitHub Pages: https://rafaam11.github.io/blog

- 글 작성: `POSTING.md` 참고
- 배포: `main` 브랜치 push 시 GitHub Actions (`pages-deploy.yml`)

## 구조

| 경로 | 내용 |
|---|---|
| `src/content/notes/` | 글. 한 편에 폴더 하나 |
| `src/pages/` | 화면과 피드, 사이트맵 |
| `src/layouts/`, `src/components/` | 공통 틀과 컴포넌트 |
| `src/styles/` | 디자인 토큰과 전체 스타일 |
| `src/site.ts`, `src/data/series.ts` | 사이트 이름·메뉴·링크, 시리즈 소개 |
| `public/` | 그대로 내보내는 파일 |

## 명령

```bash
npm install         # 의존성 설치
npm run dev         # 로컬 미리보기 (http://localhost:4321/blog/)
npm run check       # 타입과 front matter 검사
npm run build       # dist/에 빌드
npm run check:links # 빌드 결과의 내부 링크 검사
```

## 문서

| 문서 | 내용 |
|---|---|
| [`AGENTS.md`](AGENTS.md) | 작업 범위, 승인 규칙, 공개 전 점검 |
| [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) | 콘텐츠 축, 글 유형, 템플릿, 문체 |
| [`docs/PUBLISHING.md`](docs/PUBLISHING.md) | 초안에서 발행까지의 절차, LinkedIn 운영 |
| [`docs/DESIGN.md`](docs/DESIGN.md) | 디자인 토큰과 컴포넌트 규칙 |
| [`POSTING.md`](POSTING.md) | 글 파일 위치와 front matter |
