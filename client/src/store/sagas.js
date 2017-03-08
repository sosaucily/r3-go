import formActionSaga from 'redux-form-saga'

import { login, logout, toggleSessionDropdown } from 'shared/Session/sagas'

export default function* rootSaga() {
  yield [
    formActionSaga(),
    login(),
    logout(),
    toggleSessionDropdown()
  ]
}
