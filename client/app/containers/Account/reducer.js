import { fromJS } from 'immutable';

import {
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
} from './constants';

const initialState = fromJS({
  name: '',
});

const ACTION_HANDLERS = {
  [FETCH_ACCOUNT_SUCCESS]: (state, { payload }) => state, // eslint-disable-line no-unused-vars
  [FETCH_ACCOUNT_FAILURE]: (state, payload) => state, // eslint-disable-line no-unused-vars
};

export default function accountReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
