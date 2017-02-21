import { SubmissionError } from 'redux-form'
import { callApi } from 'utils/helpers/api'

// ------------------------------------
// Constants
// ------------------------------------
const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'
const SESSION_LOGIN_FAIL = 'SESSION_LOGIN_FAIL'
const TOGGLE_SESSION_FORM = 'TOGGLE_SESSION_FORM'

// ------------------------------------
// Actions
// ------------------------------------

function loginFail({ payload }) {
  throw new SubmissionError({ _error: payload.response.error })
  return {
    type: SESSION_LOGIN_FAIL
  }
}

export function toggleSessionDropdown() {
  return {
    type: TOGGLE_SESSION_FORM
  }
}

export function loginAsync({ email, password }) {
  const endpoint = `${API_URL}/v1/login`
  const body = { email: email, password: password, grantType: 'password' }

  const callDescriptor = {
    endpoint: endpoint,
    method: 'POST',
    body,
    types: [
      '',
      'SESSION_LOGIN_SUCCESS',
      ''
    ]
  }

  return callApi(callDescriptor, { onFailure: loginFail })
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_LOGIN_SUCCESS]: (state, { payload: { authToken } }) => {
    return {
      ...state,
      authToken: authToken,
      isLoggedIn: true,
      showSessionDropdown: false
    }
  },
  [SESSION_LOGIN_FAIL]: (state, { payload }) => {
    return {...state}
  },
  [TOGGLE_SESSION_FORM]: (state) => {
    return { ...state, showSessionDropdown: !state.showSessionDropdown }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoggedIn: false,
  authToken: 'none',
  showSessionDropdown: false
}

export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
