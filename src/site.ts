export const SITE = {
  title: 'Jinmin Kim',
  author: 'Jinmin Kim',
  lang: 'ko',
  locale: 'ko_KR',
  timeZone: 'Asia/Seoul',
  tagline: 'Surgical Navigation · Spatial AI · 3D Vision · Registration · Robotics',
  description:
    'Surgical Navigation, Spatial AI, 3D Vision, Registration, Robotics 분야의 연구 노트와 논문 리뷰를 기록하는 블로그입니다.',
  links: [
    { label: 'GitHub', href: 'https://github.com/rafaam11' },
    { label: 'LinkedIn', href: 'https://kr.linkedin.com/in/rlawlsals' },
  ],
} as const;

export const MENU = [
  { label: 'Notes', path: '/notes/' },
  { label: 'Series', path: '/series/' },
  { label: 'About', path: '/about/' },
] as const;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site-relative path ("/notes/") with the configured base ("/blog"). */
export function url(path: string): string {
  return base + (path.startsWith('/') ? path : '/' + path);
}
