import { createSelector } from 'reselect'

const selectAccountInfo = state => state.accountInfo

const selectName = createSelector(
  selectAccountInfo,
  sessionState => sessionState.name
)

export {
  selectName
}
