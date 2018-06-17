import titleImg from '@/static/works/work-1/images/manato.png'
import { Work } from '@/modules/home/reducer'

const work1: Work = {
  id: 1,
  title: 'My Portfolio',
  description: `
      I’ve been a CMT for ten years now, and I have, literally and
      figuratively, held the pulse of a steaming cross-section of
      San Franciscans
      `,
  img: titleImg,
  component: 'WorkOne',
  languages: [2, 6, 8, 13, 14],
}

export default work1
