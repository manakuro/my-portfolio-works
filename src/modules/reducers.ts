import home, { HomeState } from '@/modules/home/index'

export interface RootState {
  home: HomeState
}

export default {
  home,
}
