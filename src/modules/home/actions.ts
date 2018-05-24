import { IWork, Language } from '@/modules/home/reducer'
import { createAction, ActionType, createAsyncAction } from 'typesafe-actions'

const actions = {
  toggleOverlay: createAction('TOGGLE_OVERLAY', reslove => {
    return (isShowOverlay: boolean) => reslove({ isShowOverlay })
  }),

  toggleWorksContent: createAction('TOGGLE_WORKS_CONTENT', resolve => {
    return (isShowWorksContent: boolean) => resolve({ isShowWorksContent })
  }),

  toggleWorksContentAnimation: createAction(
    'TOGGLE_WORKS_CONTENT_ANIMATION',
    resolve => {
      return (isShowWorksContentAnimation: boolean) =>
        resolve({ isShowWorksContentAnimation })
    },
  ),

  updateCircle: createAction('UPDATE_CIRCLE', resolve => {
    return (circleStyle: React.CSSProperties) => resolve({ circleStyle })
  }),

  updateWorkContentImg: createAction('UPDATE_WORK_CONTENT_IMG', resolve => {
    return (workContentImg: string) => resolve({ workContentImg })
  }),

  updateTargetWork: createAction('UPDATE_TARGET_WORK', resolve => {
    return (targetWork: IWork) => resolve({ targetWork })
  }),

  fetchWorks: createAsyncAction(
    'FETCH_WORKS_REQUEST',
    'FETCH_WORKS_SUCCESS',
    'FETCH_WORKS_FAILURE',
  )<void, IWork[], Error>(),

  fetchLanguages: createAsyncAction(
    'FETCH_LANGUAGES_REQUEST',
    'FETCH_LANGUAGES_SUCCESS',
    'FETCH_LANGUAGES_FAILURE',
  )<void, Language[], Error>(),
}
export type Action = ActionType<typeof actions>

export default actions
