import { callApi } from 'utils/helpers/api'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SHA_REQUEST = 'GET_SHA_REQUEST'
export const GET_SHA_SUCCESS = 'GET_SHA_SUCCESS'
export const GET_SHA_FAILURE = 'GET_SHA_FAILURE'
export const SET_SHA = 'SET_SHA'

// ------------------------------------
// Actions
// ------------------------------------
export function getSha() {
  return callApi({
    endpoint: 'https://api.github.com/repos/sosaucily/sosaucily.github.io/git/refs',
    types: [
      GET_SHA_REQUEST,
      GET_SHA_SUCCESS,
      GET_SHA_FAILURE
    ],
    method: 'GET'}
  )
}

export const actions = {
  getSha
}

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
