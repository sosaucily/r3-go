/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import { evolve, not } from 'ramda'

import {
  LOGIN_SUCCESS,
  TOGGLE_SESSION_FORM,
  LOGOUT_SUCCESS
} from './constants';

// The initial state of the App
const initialState = { //fromJS(
  authToken: '',
  showSessionDropdown: false
};

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

export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
