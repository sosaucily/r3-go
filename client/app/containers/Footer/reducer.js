import { fromJS } from 'immutable';

import { GET_SHA_SUCCESS } from './constants';

const initialState = fromJS({});

const ACTION_HANDLERS = {
  [GET_SHA_SUCCESS]: (state, { payload }) => state.set('sha', payload.object.sha),
};

export default function footerReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
