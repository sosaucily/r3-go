import { SubmissionError } from 'redux-form'
import { callApi } from 'utils/helpers/api'

import { action } from 'utils/helpers/actions'

// ------------------------------------
// Constants
// ------------------------------------
const prefix = 'R3-GO/AccountInfo/'
export const FETCH_ACCOUNT_REQUEST = `${prefix}FETCH_ACCOUNT_REQUEST`
export const FETCH_ACCOUNT_SUCCESS = `${prefix}FETCH_ACCOUNT_SUCCESS`
export const FETCH_ACCOUNT_FAILURE = `${prefix}FETCH_ACCOUNT_FAILURE`

// ------------------------------------
// Actions
// ------------------------------------

export const fetchUserInfo = () => action(FETCH_ACCOUNT_REQUEST)

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ACCOUNT_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      name: payload[0].email,
    }
  },
  [FETCH_ACCOUNT_FAILURE]: (state, payload) => {
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
