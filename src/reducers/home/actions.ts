import types from '@/reducers/home/action-types';

export interface IActions {
  toggleOverlay(isShowOverlay: boolean): {type: string, isShowOverlay: boolean}
  toggleWorksContent(isShowWorksContent: boolean): {type: string, isShowWorksContent: boolean}
  toggleWorksContentAnimation(isShowWorksContentAnimation: boolean): {type: string, isShowWorksContentAnimation: boolean}
  updateCircle(circleStyle: any): {type: string, circleStyle: any}
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

  updateCircle(circleStyle: any) {
    return {
      type: types.UPDATE_CIRCLE,
      circleStyle
    }
  },
};


export default actions;
