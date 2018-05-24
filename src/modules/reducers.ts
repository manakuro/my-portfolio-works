import home, { HomeState } from '@/modules/home/reducer'

export interface RootState {
  home: HomeState
}

export default {
  home,
}
