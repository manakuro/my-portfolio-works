import api from './api'
import { SearchQuery } from '@/modules/home/reducer'

describe('api', () => {
  describe('fetchWorks', () => {
    it('should get works', () => {
      const searchQuery: SearchQuery = {
        languages: [1, 2, 3],
      }

      api.fetchWorks(searchQuery).subscribe(val => {
        expect(val).toEqual([
          {
            component: 'WorkOne',
            description:
              "My portfolio website built with mainly React.js. It shows the list of my works with the techs that I'm into.",
            id: 1,
            img: undefined,
            languages: [2, 6, 8, 13, 14],
            title: 'Manato Kuroda Portfolio',
          },
        ])
      })
    })
  })

  describe('fetchWork', () => {
    it('should get work', () => {
      api.fetchWork(1).subscribe(val => {
        expect(val).toEqual({
          component: 'WorkOne',
          description:
            "My portfolio website built with mainly React.js. It shows the list of my works with the techs that I'm into.",
          id: 1,
          img: undefined,
          languages: [2, 6, 8, 13, 14],
          title: 'Manato Kuroda Portfolio',
        })
      })
    })
  })

  describe('fetchLanguages', () => {
    it('should get languages', () => {
      api.fetchLanguages().subscribe(val => {
        expect(val).toEqual([
          { icon: 'rails', id: 1, name: 'Ruby on Rails' },
          { icon: 'react', id: 2, name: 'ReactJS' },
          { icon: 'angular', id: 3, name: 'Angular' },
          { icon: 'vuejs', id: 4, name: 'Vue.js' },
          { icon: 'fuel-php', id: 5, name: 'Fuel PHP' },
          { icon: 'typescript', id: 6, name: 'TypeScript' },
          { icon: 'graphql', id: 7, name: 'GraphQL' },
          { icon: 'jest', id: 8, name: 'JEST' },
          { icon: 'pwa', id: 9, name: 'PWAs' },
          { icon: 'ssr', id: 10, name: 'SSR' },
          { icon: 'elm', id: 11, name: 'Elm' },
          { icon: 'reason-react', id: 12, name: 'Reason React' },
          { icon: 'rxjs', id: 13, name: 'RxJS' },
          { icon: 'redux', id: 14, name: 'Redux' },
        ])
      })
    })
  })
})
