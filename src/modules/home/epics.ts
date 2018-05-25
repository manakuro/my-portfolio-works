import { filter, switchMap } from 'rxjs/operators'
import 'rxjs/add/operator/map'
import { Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { Action } from 'redux'
import { RootState } from '@/modules/reducers'
import actions from '@/modules/home/actions'
import api from '@/modules/home/api'

const fetchWorksEpic: Epic<Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.fetchWorks.request)),
    switchMap(action =>
      api.fetchWorks(action.payload).map(actions.fetchWorks.success),
    ),
  )

const fetchLanguagesEpic: Epic<Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.fetchLanguages.request)),
    switchMap(_ => api.fetchLanguages().map(actions.fetchLanguages.success)),
  )

export default [fetchWorksEpic, fetchLanguagesEpic]
