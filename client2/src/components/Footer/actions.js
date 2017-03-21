import { action } from 'utils/helpers/actions'
// ------------------------------------
// Constants
// ------------------------------------
const prefix = 'R3-GO/FOOTER/'
export const GET_SHA_REQUEST = `${prefix}GET_SHA_REQUEST`
export const GET_SHA_SUCCESS = `${prefix}GET_SHA_SUCCESS`
export const GET_SHA_FAILURE = `${prefix}GET_SHA_FAILURE`

// ------------------------------------
// Actions
// ------------------------------------
export const getSha = () => action(GET_SHA_REQUEST)

// ------------------------------------
// Action Handlers
// ------------------------------------
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
