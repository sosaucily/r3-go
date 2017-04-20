import { createSelector } from 'reselect'

const selectFooter = state => state.get('footer')

const selectSha = createSelector(
  selectFooter,
  footerState => footerState.get('sha')
)

export {
  selectSha
}
