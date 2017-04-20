import { createSelector } from 'reselect'

const selectSession = state => state.get('session')

const selectAuthToken = createSelector(
  selectSession,
  sessionState => sessionState.get('authToken')
)

const selectName = createSelector(
  selectSession,
  sessionState => sessionState.get('name')
)

const selectShowSessionDropdown = createSelector(
  selectSession,
  sessionState => sessionState.get('showSessionDropdown')
)

const selectIsLoggedIn = createSelector(
  selectAuthToken,
  authToken => authToken !== ''
)

export {
  selectAuthToken,
  selectIsLoggedIn,
  selectName,
  selectShowSessionDropdown
}
