import { GET_SHA_SUCCESS } from './constants'
const ACTION_HANDLERS = {
  [GET_SHA_SUCCESS] : (state, { payload }) => {
    return {
      ...state,
      sha: payload[0].object.sha
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { }
export default function footerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
