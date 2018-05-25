import { of } from 'rxjs/observable/of'
import { Observable } from 'rxjs/Observable'
import { IWork, Language, SearchQuery } from '@/modules/home/reducer'
import { WORKS_DATA } from '@/static/works/works'
import LANGUAGES from '@/static/languages'

const api = {
  fetchWorks: (searchQuery?: SearchQuery): Observable<IWork[]> => {
    // if there's api...
    // const payload = fetch(
    //   `${process.env.REACT_APP_API_END_POINT}/data/works.json`,
    // ).then(res => res.json())

    let payload = WORKS_DATA
    if (searchQuery)
      payload = WORKS_DATA.filter(
        w => !!w.languages.find(wl => searchQuery.languages.includes(wl)),
      )

    return of(payload)
  },

  fetchLanguages: (): Observable<Language[]> => {
    return of(LANGUAGES)
  },
}

export default api
