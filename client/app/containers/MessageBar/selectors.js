import { createSelector } from 'reselect'

const selectMessageBar = state => state.get('messageBar')

const selectActive = createSelector(
  selectMessageBar,
  messageBarState => messageBarState.active
)

const selectMessage = createSelector(
  selectMessageBar,
  messageBarState => messageBarState.message
)

export {
  selectActive,
  selectMessage
}
