import { createSelector } from 'reselect';

const selectMessageBar = (state) => state.get('messageBar');

const selectActive = createSelector(
  selectMessageBar,
  (messageBarState) => messageBarState.get('active')
);

const selectMessage = createSelector(
  selectMessageBar,
  (messageBarState) => messageBarState.get('message')
);

export {
  selectActive,
  selectMessage,
};
