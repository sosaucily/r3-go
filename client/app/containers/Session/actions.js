import { action } from 'utils/helpers/actions';
import {
  FETCH_BASIC_USER_INFO_REQUEST,
  LOGOUT_REQUEST,
  READ_SESSION_COOKIE,
  SET_FACEBOOK_AUTH_DATA,
  TOGGLE_SESSION_FORM_DELAY,
} from './constants';

// ------------------------------------
// Actions
// ------------------------------------

export const toggleSessionDropdown = () => action(TOGGLE_SESSION_FORM_DELAY);
export const logout = () => action(LOGOUT_REQUEST);
export const readSessionCookie = () => action(READ_SESSION_COOKIE);
export const fetchBasicUserInfo = () => action(FETCH_BASIC_USER_INFO_REQUEST);
export const setFacebookAuthData = (payload) => action(SET_FACEBOOK_AUTH_DATA, payload);
