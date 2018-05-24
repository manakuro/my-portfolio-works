import { combineEpics } from 'redux-observable'
import home from '@/modules/home/epics'

export default combineEpics(...home)
