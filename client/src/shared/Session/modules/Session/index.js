import { SubmissionError } from 'redux-form'
import { callApi } from 'utils/helpers/api'
import Cookies from 'js-cookie'
import { evolve, not } from 'ramda'
import {
  SESSION_LOGIN_REQUEST,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_FAIL,
  SESSION_LOGOUT_REQUEST,
  SESSION_LOGOUT_SUCCESS,
  SESSION_LOGOUT_FAIL,
  TOGGLE_SESSION_FORM,
  TOGGLE_SESSION_FORM_SAGA
} from './constants'

// ------------------------------------
// Actions
// ------------------------------------

export function toggleSessionDropdown() {
  return {
    type: TOGGLE_SESSION_FORM_SAGA
  }
}

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
    type: SESSION_LOGIN_SUCCESS,
    payload
  }
}

export function login({ email, password }) {
  const endpoint = `${API_URL}/v1/login`
  const body = { email: email, password: password, grantType: 'password' }

  const callDescriptor = {
    endpoint: endpoint,
    method: 'POST',
    body,
    types: [SESSION_LOGIN_REQUEST, SESSION_LOGIN_SUCCESS, SESSION_LOGIN_FAIL]
  }

  return callApi(callDescriptor, { onSuccess: loginSuccess, onFailure: loginFail })
}

function loginSuccess({ payload }) {
  Cookies.set('authToken', payload.authToken)
}

function loginFail({ payload }) {
  throw new SubmissionError({ _error: payload.response.error })
  return {
    type: SESSION_LOGIN_FAIL
  }
}

export function logout() {
  return dispatch => {
    Cookies.remove('authToken') //Make this async?
    dispatch(finishLogout())
  }
}

function finishLogout() {
  const endpoint = `${API_URL}/v1/logout`

  const callDescriptor = {
    endpoint: endpoint,
    method: 'DELETE',
    types: [
      SESSION_LOGOUT_REQUEST,
      SESSION_LOGOUT_SUCCESS,
      SESSION_LOGOUT_FAIL
    ]
  }

  return callApi(callDescriptor)
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_LOGIN_SUCCESS]: (state, { payload: { authToken } }) => {
    return {
      ...state,
      authToken,
      isLoggedIn: true,
      showSessionDropdown: false
    }
  },
  [SESSION_LOGIN_FAIL]: (state, { payload }) => {
    return {...state}
  },
  [TOGGLE_SESSION_FORM]: (state) => {
    return evolve({ showSessionDropdown: not }, state)
  },
  [SESSION_LOGOUT_SUCCESS]: (state) => {
    return {
      ...state,
      authToken: '',
      isLoggedIn: false,
      showSessionDropdown: false
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoggedIn: false,
  authToken: '',
  showSessionDropdown: false
}

export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
