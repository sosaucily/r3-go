import { SubmissionError } from 'redux-form'
import { callApi } from 'utils/helpers/api'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_ACCOUNT_REQUEST = 'FETCH_ACCOUNT_REQUEST'
const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS'
const FETCH_ACCOUNT_FAIL = 'FETCH_ACCOUNT_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function fetchUserInfo() {
  const endpoint = `${API_URL}/v1/users`

  const callDescriptor = {
    endpoint: endpoint,
    method: 'GET',
    types: [
      'FETCH_ACCOUNT_REQUEST',
      'FETCH_ACCOUNT_SUCCESS',
      'FETCH_ACCOUNT_FAIL'
    ]
  }

  return callApi(callDescriptor)
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ACCOUNT_REQUEST]: (state, payload) => {
    return {...state}
  },
  [FETCH_ACCOUNT_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      name: payload[0].email,
    }
  },
  [FETCH_ACCOUNT_FAIL]: (state, payload) => {
    return {
      ...state,
      name: ''
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  name: ''
}

export default function accountInfoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
