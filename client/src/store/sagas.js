import { toggleSessionDropdown } from 'shared/Session/modules/Session/sagas'

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export default function* rootSaga() {
  yield [
    helloSaga(),
    toggleSessionDropdown()
  ]
}
