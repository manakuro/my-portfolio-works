import sampleImg from '@/static/images/sample.jpeg'
import { IWork } from '@/reducers/home'

export const WORKS_DATA: IWork[] = Array.apply(null, new Array(21)).map(
  (_: null, i: number) => ({
    id: i + 1,
    title: 'EC Website',
    description: `
        I’ve been a CMT for ten years now, and I have, literally and
        figuratively, held the pulse of a steaming cross-section of
        San Franciscans
      `,
    img: sampleImg,
    component: 'WorkOne',
  }),
)
