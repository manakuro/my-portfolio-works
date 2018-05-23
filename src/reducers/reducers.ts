import home, { IHomeState } from '@/reducers/home/index'

export interface RootState {
  home: IHomeState
}

export default {
  home,
}
