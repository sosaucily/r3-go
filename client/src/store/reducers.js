import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import accountinfo from '../shared/AccountInfo/modules'
import messageBar from '../shared/MessageBar/modules'
import session from '../shared/Session/modules/session'
import footer from '../components/Footer/modules/footer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    form: formReducer,
    accountinfo,
    messageBar,
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
