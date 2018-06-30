import titleImg from '@/static/works/work-1/images/manato.jpg'
import { Work } from '@/modules/home/reducer'

const work1: Work = {
  id: 1,
  title: 'Manato Kuroda Portfolio',
  description:
    "My portfolio website built with mainly React.js. It shows the list of my works with the techs that I'm into.",
  img: titleImg,
  component: 'WorkOne',
  languages: [2, 6, 8, 13, 14],
}

export default work1
