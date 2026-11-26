// Series metadata. Published parts come from each note's `series` and `seriesOrder`.
// Parts that are not written yet are listed here by title only and shown as "준비 중".
export interface SeriesMeta {
  name: string;
  intro: string;
  planned: { order: number; title: string }[];
}

export const SERIES: SeriesMeta[] = [
  {
    name: '수술 내비게이션',
    intro: '수술 내비게이션을 중심으로 영상·센서 정합과 3D 비전을 공부하며 남기는 기록이다.',
    planned: [
      { order: 2, title: '의료영상과 실제 공간의 정합' },
      { order: 3, title: '다중 센서를 한 지도에 올리는 문제' },
      { order: 4, title: '움직이는 3D 구조의 복원과 추적' },
    ],
  },
];
