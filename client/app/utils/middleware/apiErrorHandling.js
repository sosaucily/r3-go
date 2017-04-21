import { showMessageBarMessage } from 'containers/MessageBar/actions';

// Works with redux-api-middleware, taking action when requests fail
const apiErrorHandlingMidddlware = (store) => (next) => (action) => {
  const message = fetchError(action.payload) || false;
  if (message) {
    store.dispatch(showMessageBarMessage(message));
  }
  return next(action);
};

function fetchError(payload) {
  let response = '';

  if (payload.name === 'ApiError' || payload.name === 'SubmissionError') {
    const errorData = payload.errors ? payload.errors : payload.response;

    if (errorData.status === 403) {
      response = 'Invalid request - 403';
    } else if (errorData.status === 401) {
      response = 'Unauthorized, please try your request again - 401';
    } else if (errorData.status === 404) {
      response = 'Error reaching server - 404';
    } else if (errorData.status === 500) {
      response = errorData.message;
    }
  }

  return response;
}

export default apiErrorHandlingMidddlware;
