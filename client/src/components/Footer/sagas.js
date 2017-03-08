import { call, take, put } from 'redux-saga/effects'

import { GET_SHA_REQUEST, GET_SHA_SUCCESS, GET_SHA_FAILURE } from './actions'
import Api from 'utils/api'

const GITHUB_URL = 'https://api.github.com/repos/sosaucily/sosaucily.github.io/git/refs'

export function* getSha() {
  while(true) {
    yield take(GET_SHA_REQUEST)
    try {
      const payload = yield call(Api.genericRequest, GITHUB_URL)
      yield put({type: GET_SHA_SUCCESS, payload})
    } catch(error) {
      console.log(error)
      put({type: GET_SHA_FAILURE, error})
    }
  }
}
