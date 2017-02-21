// ------------------------------------
// Constants
// ------------------------------------
const API_ERROR = 'API_ERROR'
const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

// ------------------------------------
// Actions
// ------------------------------------

export function showMessageBarMessage(message) {
  return {
    type: API_ERROR,
    payload: {
      message
    }
  }
}

export function clearMessage() {
  return {
    type: CLEAR_MESSAGE
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [API_ERROR]: (state, { payload }) => {
    return {
      ...state,
      active: true,
      message: payload.message
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
