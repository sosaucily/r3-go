import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import accountInfo from '../shared/AccountInfo/actions'
import messageBar from '../shared/MessageBar/modules'
import session from '../shared/Session/actions'
import footer from '../components/Footer/modules/footer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    form: formReducer,
    accountInfo,
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
