import { take, call, put, select } from 'redux-saga/effects'

import { selectAuthToken } from '../Session/selectors'

import {
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE
} from './constants'
import Api from 'utils/api'

export function* fetchUserInfo() {
  while(true) {
    yield take(FETCH_ACCOUNT_REQUEST)
    try {
      const authToken = yield select(selectAuthToken)
      const payload = yield call(Api.fetchUserInfo, authToken)
      yield put({type: FETCH_ACCOUNT_SUCCESS, payload})
    } catch (error) {
      console.log(error)
      yield put({
        type: FETCH_ACCOUNT_FAILURE,
        payload: error})
    }
  }
}

// Bootstrap sagas
export default [
  fetchUserInfo,
];
