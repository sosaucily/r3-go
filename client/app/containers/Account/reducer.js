import { fromJS } from 'immutable';

import {
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE
} from './constants'

const initialState = fromJS({
  name: ''
})

const ACTION_HANDLERS = {
  [FETCH_ACCOUNT_SUCCESS]: (state, { payload }) => {
    return state
  },
  [FETCH_ACCOUNT_FAILURE]: (state, payload) => {
    return state
  }
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
