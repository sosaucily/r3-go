import { createSelector } from 'reselect';

const selectSession = (state) => state.get('session');

const selectAuthToken = createSelector(
  selectSession,
  (sessionState) => sessionState.get('authToken')
);

const selectName = createSelector(
  selectSession,
  (sessionState) => sessionState.get('name')
);

const selectShowSessionDropdown = createSelector(
  selectSession,
  (sessionState) => sessionState.get('showSessionDropdown')
);

const selectUserDataBlob = createSelector(
  selectSession,
  (sessionState) => sessionState.get('userDataBlob')
);

const selectIsLoggedIn = createSelector(
  selectAuthToken,
  (authToken) => authToken !== ''
);

const selectAvatar = createSelector(
  selectSession,
  (sessionState) => sessionState.get('avatar')
);

export {
  selectAuthToken,
  selectAvatar,
  selectIsLoggedIn,
  selectName,
  selectShowSessionDropdown,
  selectUserDataBlob,
};
