import { take, takeEvery, call, put, cancelled, fork, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { SubmissionError } from 'redux-form/immutable';
import Cookies from 'js-cookie';

import Api from 'utils/api';
import { selectAuthToken } from './selectors';
import {
  FETCH_BASIC_USER_INFO_REQUEST,
  FETCH_BASIC_USER_INFO_SUCCESS,
  FETCH_BASIC_USER_INFO_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  READ_SESSION_COOKIE,
  SET_FACEBOOK_AUTH_DATA,
  TOGGLE_SESSION_FORM,
  TOGGLE_SESSION_FORM_DELAY,
} from './constants';

function* fetchBasicUserInfo() {
  yield put({ type: FETCH_BASIC_USER_INFO_REQUEST });
  try {
    const authToken = yield select(selectAuthToken);
    const payload = yield call(Api.fetchBasicUserInfo, authToken);
    yield put({ type: FETCH_BASIC_USER_INFO_SUCCESS, payload });
  } catch (error) {
    yield put({
      type: FETCH_BASIC_USER_INFO_FAILURE,
      payload: error });
  }
}

function* toggleSessionDropdown() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(TOGGLE_SESSION_FORM_DELAY);
    yield put({ type: TOGGLE_SESSION_FORM });
    yield call(delay, 300);
  }
}

function* setAuthCookie({ fbAuthToken, fbUserId, authToken }) {
  Cookies.set('authToken', authToken);
  Cookies.set('fbAuthToken', fbAuthToken);
  Cookies.set('fbUserId', fbUserId);
}

function* clearAuthCookie() {
  Cookies.remove('authToken');
  Cookies.remove('fbAuthToken');
  Cookies.remove('fbUserId');
}

function* getAuthCookie() {
  return Cookies.get('authToken');
}

function* authorize(email, password) {
  try {
    const payload = yield call(Api.authorize, email, password);
    yield put({ type: LOGIN_SUCCESS, payload });
    yield call(setAuthCookie, payload);
    yield call(fetchBasicUserInfo);
    return payload.authToken;
  } catch (error) {
    const message = error.response ? error.response.statusText
                                   : 'Server Unavailable';
    const status = error.response ? error.response.status : 404;
    yield put({
      type: LOGIN_FAILURE,
      payload: new SubmissionError(
        { status,
          message,
          _error: message }
      ),
    });
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }

  return false;
}

function* fbAuthorize(token, userId, moreData) {
  try {
    const payload = yield call(Api.fbAuthorize, token, userId, moreData);
    yield put({ type: LOGIN_SUCCESS, payload });
    yield call(setAuthCookie, { fbAuthToken: token, fbUserId: userId, ...payload });
    yield call(fetchBasicUserInfo);
    return payload.authToken;
  } catch (error) {
    const message = error.response ? error.response.statusText
                                   : 'Server Unavailable';
    const status = error.response ? error.response.status : 404;
    yield put({
      type: LOGIN_FAILURE,
      payload: new SubmissionError(
        { status,
          message,
          _error: message }
      ),
    });
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }

  return false;
}

function* fbLogin() {
  while (true) { // eslint-disable-line no-constant-condition
    const payload = yield take(SET_FACEBOOK_AUTH_DATA);
    const { accessToken, userID, ...moreData } = payload;
    yield fork(fbAuthorize, accessToken, userID, moreData);
  }
}

function* login() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(LOGIN_REQUEST);
    const password = payload.get('password');
    const email = payload.get('email');
    yield fork(authorize, email, password);
    // const action = yield take([LOGOUT_REQUEST, LOGIN_FAILURE])
    // if (action.type === LOGIN_FAILURE) {
    //
    // }
  }
}

function* logout() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(LOGOUT_REQUEST);
    const authToken = yield select(selectAuthToken);
    yield fork(Api.deauthorize, authToken);
    yield call(clearAuthCookie);
    yield put({ type: LOGOUT_SUCCESS });
  }
}

function* readSessionCookie() {
  yield takeEvery(READ_SESSION_COOKIE, loadCookie);
}

function* loadCookie() {
  const authToken = yield call(getAuthCookie);
  if (authToken) {
    yield put({ type: LOGIN_SUCCESS, payload: { authToken } });
    yield call(fetchBasicUserInfo);
  }
}

// export function* sessionSaga Root
export default [
  login,
  logout,
  readSessionCookie,
  fbLogin,
  toggleSessionDropdown,
];
