import { login, logout, toggleSessionDropdown } from 'shared/Session/sagas'

export default function* rootSaga() {
  yield [
    login(),
    logout(),
    toggleSessionDropdown()
  ]
}
