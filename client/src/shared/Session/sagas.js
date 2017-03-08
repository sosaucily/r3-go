import { take, call, put, cancelled, cancel, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import Cookies from 'js-cookie'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  TOGGLE_SESSION_FORM,
  TOGGLE_SESSION_FORM_SAGA
} from './actions'
import Api from 'utils/api'

export function* toggleSessionDropdown() {
  while (true) {
    yield take(TOGGLE_SESSION_FORM_SAGA)
    yield put({type: TOGGLE_SESSION_FORM})
    yield call(delay, 300)
  }
}

function* setAuthCookie({ authToken }) {
  Cookies.set('authToken', authToken)
}

function clearAuthCookie() {
  Cookies.remove('authToken')
}

function* authorize(email, password) {
  try {
    const payload = yield call(Api.authorize, email, password)
    yield put({type: LOGIN_SUCCESS, payload})
    yield call(setAuthCookie, payload)
    return payload.authToken
  } catch(error) {
    yield put({type: LOGIN_ERROR, error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* login() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUEST)
    const loginTask = yield fork(authorize, email, password)
    // const action = yield take([LOGOUT_REQUEST, LOGIN_ERROR])
    // if (action.type === LOGIN_ERROR)
      // ...
  }
}

export function* logout() {
  while (true) {
    yield take(LOGOUT_REQUEST)
    yield call(clearAuthCookie)
    const resp = yield call(Api.deauthorize)
    yield put({type: LOGOUT_SUCCESS})
  }
}

// export function* sessionSaga Root
export default [
  login,
  logout,
  toggleSessionDropdown
]
