import sampleImg from '../static/images/sample.jpeg';

export interface IWork {
  id: number;
  title: string;
  description: string;
  img: string;
}

export interface IHomeState {
  works: IWork[];
}

const initialState: IHomeState = {
  works: Array.apply(null, new Array(21)).map((_: null, i: number) => ({
    id: i + 1,
    title: 'EC Website',
    description: `
        I’ve been a CMT for ten years now, and I have, literally and
        figuratively, held the pulse of a steaming cross-section of
        San Franciscans
      `,
    img: sampleImg
  })),
};

export default function home(state: IHomeState = initialState, action: any) {
  return state;
}
