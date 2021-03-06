import { Work, Language } from '@/modules/home/reducer'
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

  toggleWorksContentExpand: createAction(
    'TOGGLE_WORKS_CONTENT_EXPAND',
    resolve => {
      return (isExpandWorksContent: boolean) =>
        resolve({ isExpandWorksContent })
    },
  ),

  updateCircle: createAction('UPDATE_CIRCLE', resolve => {
    return (circleStyle: React.CSSProperties) => resolve({ circleStyle })
  }),

  updateWorkContentImg: createAction('UPDATE_WORK_CONTENT_IMG', resolve => {
    return (workContentImg: string) => resolve({ workContentImg })
  }),

  updateTargetWork: createAction('UPDATE_TARGET_WORK', resolve => {
    return (targetWork: Work) => resolve({ targetWork })
  }),

  updateSearchQuery: createAction('UPDATE_SEARCH_QUERY', resolve => {
    return (searchQuery: any) => resolve({ searchQuery })
  }),

  updateIsLoading: createAction('UPDATE_IS_LOADING', resolve => {
    return (isLoading: boolean) => resolve({ isLoading })
  }),

  fetchWorks: createAsyncAction(
    'FETCH_WORKS_REQUEST',
    'FETCH_WORKS_SUCCESS',
    'FETCH_WORKS_FAILURE',
  )<void, Work[], Error>(),

  fetchWork: createAsyncAction(
    'FETCH_WORK_REQUEST',
    'FETCH_WORK_SUCCESS',
    'FETCH_WORK_FAILURE',
  )<number, Work, Error>(),

  fetchLanguages: createAsyncAction(
    'FETCH_LANGUAGES_REQUEST',
    'FETCH_LANGUAGES_SUCCESS',
    'FETCH_LANGUAGES_FAILURE',
  )<void, Language[], Error>(),
}
export type Action = ActionType<typeof actions>

export default actions
