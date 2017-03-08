import { action } from 'utils/helpers/actions'

// ------------------------------------
// Constants
// ------------------------------------
const API_ERROR = 'API_ERROR'
const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

// ------------------------------------
// Actions
// ------------------------------------
export const showMessageBarMessage = message => action(API_ERROR, { message })
export const clearMessage = () => action(CLEAR_MESSAGE)

// ------------------------------------
// Action Handlers
// ------------------------------------
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
