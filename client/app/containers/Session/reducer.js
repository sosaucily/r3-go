import { fromJS } from 'immutable';

import {
  FETCH_BASIC_USER_INFO_FAILURE,
  FETCH_BASIC_USER_INFO_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_FACEBOOK_AUTH_DATA,
  TOGGLE_SESSION_FORM,
} from './constants';

const initialState = fromJS({
  authToken: '',
  name: '',
  showSessionDropdown: false,
});

const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: (state, { payload: { authToken } }) =>
    state.set('authToken', authToken)
         .set('showSessionDropdown', false),
  [TOGGLE_SESSION_FORM]: (state) =>
    state.set('showSessionDropdown', !state.get('showSessionDropdown')),
  [LOGOUT_SUCCESS]: (state) =>
    state.set('authToken', '')
         .set('name', '')
         .set('showSessionDropdown', false)
         .set('avatar', '')
         .set('userDataBlob', ''),
  [FETCH_BASIC_USER_INFO_SUCCESS]: (state, { payload }) =>
    state.set('name', payload.email)
         .set('avatar', payload.avatarUrl)
         .set('userDataBlob', JSON.stringify(payload, null, 2)),
  [FETCH_BASIC_USER_INFO_FAILURE]: (state) =>
    state.set('name', ''),
  [SET_FACEBOOK_AUTH_DATA]: (state, { accessToken, userID }) =>
    state.set('fb_token', accessToken)
         .set('fb_uid', userID),
};

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
