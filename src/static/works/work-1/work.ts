import titleImg from '@/static/works/work-1/images/manato.png'
import { Work } from '@/modules/home/reducer'

const work1: Work = {
  id: 1,
  title: 'My Portfolio',
  description: `
      My portfolio website built with mainly React.js and shows the list of works that 
      I have done with the techs that I'm into. 
      `,
  img: titleImg,
  component: 'WorkOne',
  languages: [2, 6, 8, 13, 14],
}

export default work1
