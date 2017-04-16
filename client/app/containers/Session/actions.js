import Cookies from 'js-cookie'
import { evolve, not } from 'ramda'

import { action } from 'utils/helpers/actions'
import {
  FETCH_BASIC_USER_INFO,
  LOGOUT_REQUEST,
  READ_SESSION_COOKIE,
  TOGGLE_SESSION_FORM_DELAY
} from './constants'

// ------------------------------------
// Actions
// ------------------------------------

export const toggleSessionDropdown = () => action(TOGGLE_SESSION_FORM_DELAY)
export const logout = () => action(LOGOUT_REQUEST)
export const readSessionCookie = () => action(READ_SESSION_COOKIE)
export const fetchBasicUserInfo = () => action(FETCH_BASIC_USER_INFO)
