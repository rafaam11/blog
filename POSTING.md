# 새 글 작성 방법

이 저장소는 [Astro](https://astro.build/)로 만든 정적 사이트다. 글은 마크다운 파일이고, 빌드할 때 front matter를 검사한다.

작업 범위와 승인 규칙은 `AGENTS.md`, 글 유형과 문체는 `docs/CONTENT-GUIDE.md`, 발행 절차는 `docs/PUBLISHING.md`를 본다.

## 파일 위치

글 한 편에 폴더 하나를 쓴다. 폴더 이름이 글 주소가 된다.

```
src/content/notes/<slug>/index.md
src/content/notes/<slug>/그림.svg
```

예: `src/content/notes/depth-estimation-notes/index.md`는 `/blog/posts/depth-estimation-notes/`로 발행된다.

- slug는 영문 소문자, 숫자, 하이픈만 쓴다.
- 발행한 글의 폴더 이름은 바꾸지 않는다. 바꾸면 주소가 바뀐다.

## Front Matter (YAML)

```yaml
---
title: 글 제목
date: YYYY-MM-DD HH:MM:SS +0900
type: Research Note
tags: [태그1, 태그2]
series: 시리즈 이름
seriesOrder: 1
math: false
---
```

| 필드 | 필수 | 설명 |
|---|---|---|
| `title` | 예 | 글 제목 |
| `date` | 예 | 발행 시각. `+0900`을 붙인다 |
| `type` | 예 | 글 유형. 아래 일곱 가지 가운데 하나 |
| `tags` | 아니오 | 태그 목록. 태그 주소는 소문자로 바뀐다(`3D-Vision`은 `/tags/3d-vision/`) |
| `series` | 아니오 | 시리즈 이름. 시리즈에 속한 글에만 적는다 |
| `seriesOrder` | 아니오 | 시리즈 안의 순서. 1부터 시작한다 |
| `math` | 아니오 | `true`이면 수식 스타일(KaTeX)을 불러온다. 수식이 있는 글에만 켠다 |
| `description` | 아니오 | 검색 결과와 공유 미리보기에 쓰는 한두 문장. 없으면 사이트 설명을 쓴다 |
| `draft` | 아니오 | `true`이면 배포본에서 빠진다. 로컬 미리보기에는 보인다 |

`type`에 쓸 수 있는 값: `Research Note`, `Paper Review`, `Technical Deep Dive`, `Implementation Note`, `Development Log`, `Research Journey`, `Project Case Study`. 뜻은 `docs/CONTENT-GUIDE.md`에 있다.

표에 없는 값을 `type`에 쓰거나 필수 필드를 빠뜨리면 빌드가 실패한다.

## 시리즈

`series`와 `seriesOrder`를 적으면 시리즈 페이지와 글 위의 시리즈 상자에 자동으로 들어간다.

아직 쓰지 않은 편을 "준비 중"으로 보여 주려면 `src/data/series.ts`의 `planned`에 순번과 제목을 적는다. 그 편을 발행하면 글이 자리를 대신한다.

## 그림

그림은 글과 같은 폴더에 두고 상대 경로로 가리킨다.

```markdown
![대체 텍스트](./그림.svg)

*그림. 설명 문장.*
```

- 그림 바로 다음 문단을 기울임 한 줄로 쓰면 그림 설명으로 표시된다.
- 대체 텍스트는 빠뜨리지 않는다.
- 남의 그림을 쓰면 설명에 출처와 사용 조건을 적는다.

## 수식과 코드

- 수식: 인라인은 `$ ... $`, 블록은 앞뒤에 빈 줄을 두고 `$$ ... $$`. front matter에 `math: true`가 필요하다.
- 코드: 언어 이름을 붙인 코드 fence를 쓴다.
- Mermaid는 지원하지 않는다. 도식은 SVG로 그려서 넣는다.

## 참고문헌

글 끝에 `## 참고문헌` 제목과 번호 목록을 둔다. 본문에서는 `[1]`처럼 번호로 가리킨다.

## 로컬 미리보기

Node 22.23.4 이상이 필요하다.

```bash
npm install
npm run dev
```

브라우저: http://localhost:4321/blog/

올리기 전에 배포와 같은 검사를 돌린다.

```bash
npm run check
npm run build
npm run check:links
```
