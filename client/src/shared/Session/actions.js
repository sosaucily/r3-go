import { SubmissionError } from 'redux-form'
import { callApi } from 'utils/helpers/api'
import Cookies from 'js-cookie'
import { evolve, not } from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------

export const LOGIN_REQUEST = 'R3-GO/SESSIN/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'R3-GO/SESSION/LOGIN_SUCCESS'
export const LOGIN_ERROR = 'R3-GO/SESSION/LOGIN_ERROR'
export const LOGOUT_REQUEST = 'R3-GO/SESSION/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'R3-GO/SESSION/LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'R3-GO/SESSION/LOGOUT_ERROR'
export const TOGGLE_SESSION_FORM_SAGA = 'R3-GO/SESSION/TOGGLE_SESSION_FORM_SAGA'
export const TOGGLE_SESSION_FORM = 'R3-GO/SESSION/TOGGLE_SESSION_FORM'

// ------------------------------------
// Actions
// ------------------------------------

function action(type, payload = {}) {
  return {type, ...payload}
}

export const toggleSessionDropdown = () => action(TOGGLE_SESSION_FORM_SAGA)
export const login = creds => action(LOGIN_REQUEST, creds)
export const logout = () => action(LOGOUT_REQUEST)

export function readSessionCookie() {
  return dispatch => {
    const authToken = Cookies.get('authToken')
    if (authToken) {
      dispatch(setSession({ authToken }))
    }
  }
}

function setSession(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

function loginFail({ payload }) {
  throw new SubmissionError({ _error: payload.response.error })
  return {
    type: SESSION_LOGIN_FAIL
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: (state, { payload: { authToken }}) => {
    return {
      ...state,
      authToken,
      showSessionDropdown: false
    }
  },
  [TOGGLE_SESSION_FORM]: (state) => {
    return evolve({ showSessionDropdown: not }, state)
  },
  [LOGOUT_SUCCESS]: (state) => {
    return {
      ...state,
      authToken: '',
      showSessionDropdown: false
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  authToken: '',
  showSessionDropdown: false
}

export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
