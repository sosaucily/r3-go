import { showMessageBarMessage } from 'containers/MessageBar/actions'

//Works with redux-api-middleware, taking action when requests fail
const apiErrorHandlingMidddlware = store => next => action => {
  const message = fetchError(action)
  if (message) {
      store.dispatch(showMessageBarMessage(message))
  }
  return next(action)
}

function fetchError(action) {
  if (!action.payload) return
  const payload = action.payload

  if (payload.name === 'ApiError' || payload.name === 'SubmissionError') {
    const errorData = payload.errors ? payload.errors : payload.response
    if (errorData.status === 403) {
      return `Invalid request - 403`
    } else if (errorData.status === 401) {
      return `Unauthorized, please try your request again - 401`
    } else if (errorData.status === 404) {
      return `Error reaching server - 404`
    } else if (errorData.status === 500) {
      return errorData.message
    }
  }
}

export default apiErrorHandlingMidddlware
