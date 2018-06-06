import { of } from 'rxjs/observable/of'
import { Observable } from 'rxjs/Observable'
import { Work, Language, SearchQuery } from '@/modules/home/reducer'
import { WORKS_DATA } from '@/static/works/works'
import LANGUAGES from '@/static/languages'

const api = {
  fetchWorks: (searchQuery?: SearchQuery): Observable<Work[]> => {
    // if there's api...
    // const payload = fetch(
    //   `${process.env.REACT_APP_API_END_POINT}/data/works.json`,
    // ).then(res => res.json())

    let payload = WORKS_DATA
    if (searchQuery && searchQuery.languages.length)
      payload = WORKS_DATA.filter(
        w => !!w.languages.find(wl => searchQuery.languages.includes(wl)),
      )

    return of(payload)
  },

  fetchWork: (workId: number): Observable<Work | {}> => {
    const payload = WORKS_DATA.find(w => w.id === workId) || {}
    return of(payload)
  },

  fetchLanguages: (): Observable<Language[]> => {
    return of(LANGUAGES)
  },
}

export default api
