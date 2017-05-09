import { fromJS } from 'immutable';

import {
  FETCH_BASIC_USER_INFO_FAILURE,
  FETCH_BASIC_USER_INFO_SUCCESS,
  LOGIN_SUCCESS,
  TOGGLE_SESSION_FORM,
  LOGOUT_SUCCESS,
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
         .set('showSessionDropdown', false),
  [FETCH_BASIC_USER_INFO_SUCCESS]: (state, { payload }) =>
    state.set('name', payload.email),
  [FETCH_BASIC_USER_INFO_FAILURE]: (state) =>
    state.set('name', ''),
};

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
