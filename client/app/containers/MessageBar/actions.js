import { action } from 'utils/helpers/actions'
import { API_ERROR, CLEAR_MESSAGE } from './constants'

// ------------------------------------
// Actions
// ------------------------------------
export const showMessageBarMessage = message => action(API_ERROR, { message })
export const clearMessage = () => action(CLEAR_MESSAGE)
