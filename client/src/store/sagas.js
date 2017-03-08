import formActionSaga from 'redux-form-saga'

import { login, logout, readSessionCookie, toggleSessionDropdown } from 'shared/Session/sagas'
import { fetchUserInfo } from 'shared/AccountInfo/sagas'
import { getSha } from 'components/Footer/sagas'

export default function* rootSaga() {
  yield [
    fetchUserInfo(),
    formActionSaga(),
    getSha(),
    login(),
    logout(),
    readSessionCookie(),
    toggleSessionDropdown()
  ]
}
