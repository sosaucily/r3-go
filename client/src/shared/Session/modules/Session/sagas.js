import { take, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import { TOGGLE_SESSION_FORM_SAGA } from './constants'

export function* toggleSessionDropdown() {
  while (true) {
    yield take(TOGGLE_SESSION_FORM_SAGA)
    yield put({type: 'TOGGLE_SESSION_FORM'})
    yield call(delay, 300)
  }
}

export default [
  toggleSessionDropdown,
]
