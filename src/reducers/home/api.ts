import { from } from 'rxjs/observable/from'
import { Observable } from 'rxjs/Observable'
import { IWork } from '@/reducers/home/index'

const api = {
  fetchWorks: (): Observable<IWork[]> => {
    const payload = fetch(
      `${process.env.REACT_APP_API_END_POINT}/json/works.json`,
    ).then(res => res.json())

    return from(payload)
  },
}

export default api
