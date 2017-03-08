import { SubmissionError } from 'redux-form'
import { callApi } from 'utils/helpers/api'
import Cookies from 'js-cookie'
import { evolve, not } from 'ramda'

import { action } from 'utils/helpers/actions'

// ------------------------------------
// Constants
// ------------------------------------
const prefix = 'R3-GO/SESSION/'
export const LOGIN_FORM_ACTION_PREFIX = `${prefix}LOGIN`
export const LOGIN_REQUEST = `${prefix}LOGIN_REQUEST`
export const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`
export const LOGIN_FAILURE = `${prefix}LOGIN_FAILURE`
export const LOGOUT_REQUEST = `${prefix}LOGOUT_REQUEST`
export const LOGOUT_SUCCESS = `${prefix}LOGOUT_SUCCESS`
export const LOGOUT_ERROR = `${prefix}LOGOUT_ERROR`
export const READ_SESSION_COOKIE = `${prefix}READ_SESSION_COOKIE`
export const TOGGLE_SESSION_FORM_DELAY = `${prefix}TOGGLE_SESSION_FORM_DELAY`
export const TOGGLE_SESSION_FORM = `${prefix}TOGGLE_SESSION_FORM`

// ------------------------------------
// Actions
// ------------------------------------

export const toggleSessionDropdown = () => action(TOGGLE_SESSION_FORM_DELAY)
export const logout = () => action(LOGOUT_REQUEST)
export const readSessionCookie = () => action(READ_SESSION_COOKIE)

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
