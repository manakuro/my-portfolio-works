import types from '@/reducers/home/action-types';
import { IWork } from '@/reducers/home/index';

export interface IActions {
  toggleOverlay(isShowOverlay: boolean): {type: string, isShowOverlay: boolean}
  toggleWorksContent(isShowWorksContent: boolean): {type: string, isShowWorksContent: boolean}
  toggleWorksContentAnimation(isShowWorksContentAnimation: boolean): {type: string, isShowWorksContentAnimation: boolean}
  updateCircle(circleStyle: React.CSSProperties): {type: string, circleStyle: React.CSSProperties}
  updateWorkContentImg(workContentImg: string): { type: string, workContentImg: string }
  updateTargetWork(payload: IWork): { type: string, payload: IWork }
}

const actions: IActions = {
  toggleOverlay(isShowOverlay: boolean) {
    return {
      type: types.TOGGLE_OVERLAY,
      isShowOverlay,
    }
  },

  toggleWorksContent(isShowWorksContent: boolean) {
    return {
      type: types.TOGGLE_WORKS_CONTENT,
      isShowWorksContent,
    }
  },

  toggleWorksContentAnimation(isShowWorksContentAnimation: boolean) {
    return {
      type: types.TOGGLE_WORKS_CONTENT_ANIMATION,
      isShowWorksContentAnimation,
    }
  },

  updateCircle(circleStyle: React.CSSProperties) {
    return {
      type: types.UPDATE_CIRCLE,
      circleStyle
    }
  },

  updateWorkContentImg(workContentImg: string) {
    return {
      type: types.UPDATE_WORK_CONTENT_IMG,
      workContentImg
    }
  },

  updateTargetWork(payload: IWork) {
    return {
      type: types.UPDATE_TARGET_WORK,
      payload
    }
  }
};


export default actions;
