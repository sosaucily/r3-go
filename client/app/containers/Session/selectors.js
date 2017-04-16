import { createSelector } from 'reselect'

const selectSession = state => state.get('session')

const selectAuthToken = createSelector(
  selectSession,
  sessionState => sessionState.authToken
)

const selectName = createSelector(
  selectSession,
  sessionState => sessionState.name
)

const selectShowSessionDropdown = createSelector(
  selectSession,
  sessionState => sessionState.showSessionDropdown
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
