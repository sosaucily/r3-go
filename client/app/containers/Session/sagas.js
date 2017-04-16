import { take, takeEvery, call, put, cancelled, cancel, fork, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { SubmissionError } from 'redux-form/immutable'
import Cookies from 'js-cookie'

import { selectAuthToken } from './selectors'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  READ_SESSION_COOKIE,
  TOGGLE_SESSION_FORM,
  TOGGLE_SESSION_FORM_DELAY
} from './constants'
import Api from 'utils/api'

export function* toggleSessionDropdown() {
  while (true) {
    yield take(TOGGLE_SESSION_FORM_DELAY)
    yield put({type: TOGGLE_SESSION_FORM})
    yield call(delay, 300)
  }
}

function* setAuthCookie({ authToken }) {
  Cookies.set('authToken', authToken)
}

function* clearAuthCookie() {
  Cookies.remove('authToken')
}

function* getAuthCookie() {
  return Cookies.get('authToken')
}

function* authorize(email, password) {
  try {
    const payload = yield call(Api.authorize, email, password)
    yield put({type: LOGIN_SUCCESS, payload})
    yield call(setAuthCookie, payload)
    return payload.authToken
  } catch(error) {
    const message = error.response ? error.response.statusText
                                   : 'Server Unavailable'
    const status = error.response ? error.response.status : 404
    yield put({
      type: LOGIN_FAILURE,
      payload: new SubmissionError(
        { status: status,
          message: message,
          _error: message }
      )
    })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* login() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST)
    const password = payload.get('password')
    const email = payload.get('email')
    const loginTask = yield fork(authorize, email, password)
    // const action = yield take([LOGOUT_REQUEST, LOGIN_FAILURE])
    // if (action.type === LOGIN_FAILURE) {
    //
    // }
  }
}

export function* logout() {
  while (true) {
    yield take(LOGOUT_REQUEST)
    const authToken = yield select(selectAuthToken)
    const resp = yield fork(Api.deauthorize, authToken)
    yield call(clearAuthCookie)
    yield put({type: LOGOUT_SUCCESS})
  }
}

export function* readSessionCookie() {
  yield takeEvery(READ_SESSION_COOKIE, loadCookie)
}

function* loadCookie() {
  const authToken = yield call(getAuthCookie)
  if (authToken) {
    yield put({type: LOGIN_SUCCESS, payload: { authToken }})
  }
}

// export function* sessionSaga Root
export default [
  login,
  logout,
  readSessionCookie,
  toggleSessionDropdown
]
