import {
  API_ERROR,
  CLEAR_MESSAGE
} from './constants'

const ACTION_HANDLERS = {
  [API_ERROR]: (state, { message }) => {
    return {
      ...state,
      active: true,
      message
    }
  },
  [CLEAR_MESSAGE]: (state) => {
    return { ...state, active: false, message: '' }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  active: false,
  message: ''
}

export default function messageBarReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
