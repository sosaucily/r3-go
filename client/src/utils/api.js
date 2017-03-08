import { merge } from 'ramda'
import { camelizeKeys } from 'humps'
// import 'whatwg-fetch'

const baseOptions =
  {  method: 'GET',
     headers: {
       'Content-Type': 'application/json' }
  }

function deauthorize() {
  const endpoint = `${API_URL}/v1/logout`
  const mergedOptions = merge(baseOptions, { method: 'DELETE' })

  return fetch(endpoint, mergedOptions).then(checkStatus)
}

function authorize(email, password) {
  const endpoint = `${API_URL}/v1/login`
  const body = JSON.stringify({ email: email, password: password, grantType: 'password' })
  const mergedOptions = merge(baseOptions, { method: 'POST', body })

  return request(endpoint, mergedOptions)
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(camelizeKeys)
}

export default {
  authorize,
  deauthorize
}
