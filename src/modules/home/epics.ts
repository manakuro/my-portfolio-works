import { filter, switchMap } from 'rxjs/operators'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/delay'
import { Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { Action } from 'redux'
import { RootState } from '@/modules/reducers'
import actions from '@/modules/home/actions'
import api from '@/modules/home/api'
import { concat } from 'rxjs/observable/concat'
import { of } from 'rxjs/observable/of'

const fetchWorksEpic: Epic<Action, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.fetchWorks.request)),
    switchMap(_ =>
      concat(
        of(actions.updateIsLoading(true)),
        api
          .fetchWorks(store.getState().home.searchQuery)
          .delay(200)
          .map(actions.fetchWorks.success),
        of(actions.updateIsLoading(false)),
      ),
    ),
  )

const fetchLanguagesEpic: Epic<Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.fetchLanguages.request)),
    switchMap(_ => api.fetchLanguages().map(actions.fetchLanguages.success)),
  )

export default [fetchWorksEpic, fetchLanguagesEpic]
