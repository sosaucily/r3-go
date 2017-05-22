import { call, take, put } from 'redux-saga/effects';

import Api from 'utils/api';
import { GET_SHA_REQUEST, GET_SHA_SUCCESS, GET_SHA_FAILURE } from './constants';

const GITHUB_URL = 'https://api.github.com/repos/sosaucily/r3-go/git/refs/heads/master';

function* getSha() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(GET_SHA_REQUEST);
    try {
      const payload = yield call(Api.genericRequest, GITHUB_URL);
      yield put({ type: GET_SHA_SUCCESS, payload });
    } catch (error) {
      console.log(error);
      put({ type: GET_SHA_FAILURE, error });
    }
  }
}

export default [
  getSha,
];
