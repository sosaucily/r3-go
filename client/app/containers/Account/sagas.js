import { take, call, put, select } from 'redux-saga/effects';

import Api from 'utils/api';
import { selectAuthToken } from '../Session/selectors';
import {
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
} from './constants';

export function* fetchAccountInfo() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(FETCH_ACCOUNT_REQUEST);
    try {
      const authToken = yield select(selectAuthToken);
      const payload = yield call(Api.fetchAccountInfo, authToken);
      yield put({ type: FETCH_ACCOUNT_SUCCESS, payload });
    } catch (error) {
      console.log(error);
      yield put({
        type: FETCH_ACCOUNT_FAILURE,
        payload: error });
    }
  }
}

// Bootstrap sagas
export default [
  fetchAccountInfo,
];
