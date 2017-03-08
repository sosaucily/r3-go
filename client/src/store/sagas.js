import formActionSaga from 'redux-form-saga'

import { login, logout, readSessionCookie, toggleSessionDropdown } from 'shared/Session/sagas'
import { fetchUserInfo } from 'shared/AccountInfo/sagas'

export default function* rootSaga() {
  yield [
    fetchUserInfo(),
    formActionSaga(),
    login(),
    logout(),
    readSessionCookie(),
    toggleSessionDropdown()
  ]
}
