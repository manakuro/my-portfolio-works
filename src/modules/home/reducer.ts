import { getType } from 'typesafe-actions'
import actions, { Action } from './actions'

/* interfaces */
export interface IWork {
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
}

export interface SearchQuery {
  languages: number[]
}

export interface HomeState {
  works: IWork[]
  workContentImg: string
  isShowOverlay: boolean
  isShowWorksContent: boolean
  isShowWorksContentAnimation: boolean
  circleStyle: React.CSSProperties
  targetWork: IWork | null
  languages: Language[]
  searchQuery: SearchQuery
}

/* reducer */
const initialState: HomeState = {
  works: [],
  workContentImg: '',
  isShowOverlay: false,
  isShowWorksContent: false,
  isShowWorksContentAnimation: false,
  circleStyle: {},
  targetWork: null,
  languages: [],
  searchQuery: {
    languages: [],
  },
}

export default function home(state: HomeState = initialState, action: Action) {
  switch (action.type) {
    case getType(actions.toggleOverlay):
      return { ...state, ...action.payload }

    case getType(actions.toggleWorksContent):
      return { ...state, ...action.payload }

    case getType(actions.toggleWorksContentAnimation):
      return { ...state, ...action.payload }

    case getType(actions.updateCircle):
      return { ...state, ...action.payload }

    case getType(actions.updateWorkContentImg):
      return { ...state, ...action.payload }

    case getType(actions.updateTargetWork):
      return { ...state, ...action.payload }

    case getType(actions.updateSearchQuery):
      return { ...state, ...action.payload }

    case getType(actions.fetchWorks.success):
      return { ...state, works: action.payload }

    case getType(actions.fetchLanguages.success):
      return { ...state, languages: action.payload }

    default:
      return state
  }
}
