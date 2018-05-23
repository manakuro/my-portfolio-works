import sampleImg from '@/static/images/sample.jpeg'
import { getType } from 'typesafe-actions'
import actions, { Action } from './actions'

/* interfaces */
export interface IWork {
  id: number
  title: string
  description: string
  img: string
  component: string
}

export interface IHomeState {
  works: IWork[]
  workContentImg: string
  isShowOverlay: boolean
  isShowWorksContent: boolean
  isShowWorksContentAnimation: boolean
  circleStyle: React.CSSProperties
  targetWork: IWork | null
}

/* reducer */
const initialState: IHomeState = {
  works: Array.apply(null, new Array(21)).map((_: null, i: number) => ({
    id: i + 1,
    title: 'EC Website',
    description: `
        I’ve been a CMT for ten years now, and I have, literally and
        figuratively, held the pulse of a steaming cross-section of
        San Franciscans
      `,
    img: sampleImg,
    component: 'WorkOne',
  })),
  workContentImg: '',
  isShowOverlay: false,
  isShowWorksContent: false,
  isShowWorksContentAnimation: false,
  circleStyle: {},
  targetWork: null,
}

export default function home(state: IHomeState = initialState, action: Action) {
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

    case getType(actions.fetchWorks.success):
      console.log('payload', action.payload)
      return { ...state, ...action.payload }

    default:
      return state
  }
}
