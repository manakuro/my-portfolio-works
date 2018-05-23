import { of } from 'rxjs/observable/of'
import { Observable } from 'rxjs/Observable'
import { IWork } from '@/reducers/home/index'
import { WORKS_DATA } from '@/static/data/works'

const api = {
  fetchWorks: (): Observable<IWork[]> => {
    // if there's api...
    // const payload = fetch(
    //   `${process.env.REACT_APP_API_END_POINT}/data/works.json`,
    // ).then(res => res.json())
    return of(WORKS_DATA)
  },
}

export default api
