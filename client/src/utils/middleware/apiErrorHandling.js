import { showMessageBarMessage } from 'shared/MessageBar/modules'

//Works with redux-api-middleware, taking action when requests fail
const apiErrorHandlingMidddlware = store => next => action => {
  const message = isUnauthorized(action)
  if (message) {
      store.dispatch(showMessageBarMessage(message))
  }
  next(action)
}

function isUnauthorized(action) {
  if (action.payload && action.payload.name === 'ApiError') {
    if (action.payload.status === 403) {
      return `Invalid request - 403`
    } else if (action.payload.status === 401) {
      return `Unauthorized, please try your request again - 401`
    } else if (action.payload.status === 500) {
      return action.payload.message
    }
  }
}


export default apiErrorHandlingMidddlware
