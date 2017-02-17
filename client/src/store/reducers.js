import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import session from '../shared/Session/modules/session'
import footer from '../components/Footer/modules/footer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    form: formReducer,
    footer,
    session,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
