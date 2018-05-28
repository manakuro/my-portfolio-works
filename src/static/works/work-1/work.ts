import sampleImg from '@/static/images/sample.jpeg'
import { Work } from '@/modules/home/reducer'

const work1: Work = {
  id: 1,
  title: 'EC Website',
  description: `
      I’ve been a CMT for ten years now, and I have, literally and
      figuratively, held the pulse of a steaming cross-section of
      San Franciscans
      `,
  img: sampleImg,
  component: 'WorkOne',
  languages: [1, 2],
}

export default work1
