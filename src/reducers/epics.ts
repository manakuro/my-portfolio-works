import { combineEpics } from 'redux-observable'
import home from '@/reducers/home/epics'

export default combineEpics(...home)
