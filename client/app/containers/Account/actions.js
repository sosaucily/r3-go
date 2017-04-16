import { SubmissionError } from 'redux-form'

import { action } from 'utils/helpers/actions'
import { FETCH_ACCOUNT_REQUEST } from './constants'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchUserInfo = () => action(FETCH_ACCOUNT_REQUEST)
