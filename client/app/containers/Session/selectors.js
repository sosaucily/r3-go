import { createSelector } from 'reselect'

const selectSession = state => state.get('session')

const selectAuthToken = createSelector(
  selectSession,
  sessionState => sessionState.authToken
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
  selectShowSessionDropdown
}
