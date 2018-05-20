import { IWork } from '@/reducers/home/index'
import { createAction, ActionType } from 'typesafe-actions'

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
}
export type Action = ActionType<typeof actions>

export default actions
