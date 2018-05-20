import types from '@/reducers/home/action-types';
import sampleImg from '@/static/images/sample.jpeg';

/* interfaces */
export interface IWork {
  id: number
  title: string;
  description: string;
  img: string;
  component: string;
}

export interface IHomeState {
  works: IWork[];
  workContentImg: string;
  isShowOverlay: boolean;
  isShowWorksContent: boolean;
  isShowWorksContentAnimation: boolean;
  circleStyle: React.CSSProperties;
  targetWork: IWork | null;
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
};

export default function home(state: IHomeState = initialState, action: any ) {
  switch (action.type) {
    case types.TOGGLE_OVERLAY:
      const { isShowOverlay } = action;
      return { ...state, isShowOverlay };

    case types.TOGGLE_WORKS_CONTENT:
      const { isShowWorksContent } = action;
      return { ...state, isShowWorksContent };

    case types.TOGGLE_WORKS_CONTENT_ANIMATION:
      const { isShowWorksContentAnimation } = action;
      return { ...state, isShowWorksContentAnimation };

    case types.UPDATE_CIRCLE:
      const { circleStyle } = action;
      return { ...state, circleStyle };

    case types.UPDATE_WORK_CONTENT_IMG:
      const { workContentImg } = action;
      return { ...state, workContentImg };

    case types.UPDATE_TARGET_WORK:
      const { payload } = action;
      return { ...state, targetWork: payload };

    default:
      return state;
  }
}
