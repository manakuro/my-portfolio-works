import { getType } from 'typesafe-actions'
import actions, { Action } from './actions'

/* interfaces */
export interface Work {
  id: number
  title: string
  description: string
  img: string
  component: string
  languages: SearchQuery['languages']
}

export interface Language {
  id: number
  name: string
  icon: string
}

export interface SearchQuery {
  languages: number[]
}

export interface HomeState {
  works: Work[]
  workContentImg: string
  isShowOverlay: boolean
  isShowWorksContent: boolean
  isShowWorksContentAnimation: boolean
  isExpandWorksContent: boolean
  circleStyle: React.CSSProperties
  targetWork: Work | null
  languages: Language[]
  searchQuery: SearchQuery
  isLoading: boolean
}

/* reducer */
const initialState: HomeState = {
  works: [],
  workContentImg: '',
  isShowOverlay: false,
  isShowWorksContent: false,
  isShowWorksContentAnimation: false,
  isExpandWorksContent: false,
  circleStyle: {
    top: '500px',
    left: '500px',
  },
  targetWork: null,
  languages: [],
  searchQuery: {
    languages: [],
  },
  isLoading: true,
}

export default function home(state: HomeState = initialState, action: Action) {
  switch (action.type) {
    case getType(actions.toggleOverlay):
      return { ...state, ...action.payload }

    case getType(actions.toggleWorksContent):
      return { ...state, ...action.payload }

    case getType(actions.toggleWorksContentAnimation):
      return { ...state, ...action.payload }

    case getType(actions.toggleWorksContentExpand):
      return { ...state, ...action.payload }

    case getType(actions.updateCircle):
      return { ...state, ...action.payload }

    case getType(actions.updateWorkContentImg):
      return { ...state, ...action.payload }

    case getType(actions.updateTargetWork):
      return { ...state, ...action.payload }

    case getType(actions.updateSearchQuery):
      return {
        ...state,
        searchQuery: { ...state.searchQuery, ...action.payload.searchQuery },
      }

    case getType(actions.updateIsLoading):
      return { ...state, ...action.payload }

    case getType(actions.fetchWorks.success):
      return { ...state, works: action.payload }

    case getType(actions.fetchWork.success):
      return { ...state, targetWork: action.payload }

    case getType(actions.fetchLanguages.success):
      return { ...state, languages: action.payload }

    default:
      return state
  }
}
