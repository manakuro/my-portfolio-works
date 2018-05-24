import { of } from 'rxjs/observable/of'
import { Observable } from 'rxjs/Observable'
import { IWork, Language } from '@/modules/home/reducer'
import { WORKS_DATA } from '@/static/works/works'
import LANGUAGES from '@/static/languages'

const api = {
  fetchWorks: (): Observable<IWork[]> => {
    // if there's api...
    // const payload = fetch(
    //   `${process.env.REACT_APP_API_END_POINT}/data/works.json`,
    // ).then(res => res.json())
    return of(WORKS_DATA)
  },

  fetchLanguages: (): Observable<Language[]> => {
    return of(LANGUAGES)
  },
}

export default api
