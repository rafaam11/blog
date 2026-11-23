# 새 글 작성 방법

이 저장소는 [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) 테마를 사용합니다.

## 파일 이름

`_posts/` 아래에 다음 형식으로 파일을 만듭니다.

```
YYYY-MM-DD-제목-slug.md
```

예: `2026-11-23-depth-estimation-notes.md`

## Front Matter (YAML)

글 맨 위에 다음 필드를 작성합니다.

```yaml
---
title: 글 제목
date: YYYY-MM-DD HH:MM:SS +0900
categories: [대분류, 소분류]
tags: [태그1, 태그2]
math: true
mermaid: true
---
```

| 필드 | 설명 |
|------|------|
| `title` | 글 제목 |
| `date` | 발행 시각 (`timezone`은 `_config.yml`의 `Asia/Seoul`, `date`에는 `+0900` 권장) |
| `categories` | 최대 2단계 권장 |
| `tags` | 소문자 태그 목록 |
| `math` | `true`이면 MathJax 로드 (수식이 있는 글에만 켜기) |
| `mermaid` | `true`이면 Mermaid 다이어그램 사용 가능 |

수식: 인라인은 `$$ ... $$`, 블록은 앞뒤 빈 줄을 두고 `$$ ... $$`.

Mermaid: ` ```mermaid ` 코드 fence 사용 (`mermaid: true` 필요).

## 이미지

글 전용 이미지는 `assets/img/posts/` 아래에 두고, 마크다운에서 `{{ site.baseurl }}/assets/img/posts/파일명.png` 또는 `/assets/img/posts/파일명.png` 형태로 참조합니다. (`baseurl`은 `/blog`입니다.)

## 로컬 미리보기

```bash
bundle install
JEKYLL_ENV=production bundle exec jekyll serve --baseurl /blog
```

브라우저: http://127.0.0.1:4000/blog/