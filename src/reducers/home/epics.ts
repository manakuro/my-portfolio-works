import { filter, switchMap } from 'rxjs/operators'
import 'rxjs/add/operator/map'
import { Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { Action } from 'redux'
import { RootState } from '@/reducers/reducers'
import actions from '@/reducers/home/actions'
import api from '@/reducers/home/api'

const fetchWorksEpic: Epic<Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.fetchWorks.request)),
    switchMap(_ => api.fetchWorks().map(actions.fetchWorks.success)),
  )

export default [fetchWorksEpic]
