import home, { HomeState } from '@/reducers/home/index'

export interface RootState {
  home: HomeState
}

export default {
  home,
}
