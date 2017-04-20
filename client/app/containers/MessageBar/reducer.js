import { fromJS } from 'immutable';

import {
  API_ERROR,
  CLEAR_MESSAGE
} from './constants'

const initialState = fromJS({
  active: false,
  message: ''
})

const ACTION_HANDLERS = {
  [API_ERROR]: (state, { message }) => {
    return state
      .set('active', true)
      .set('message', message)
  },
  [CLEAR_MESSAGE]: (state) => {
    return state
      .set('active', false)
      .set('message', '')
  }
}

export default function messageBarReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
