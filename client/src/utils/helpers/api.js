/* Wrapper for redux-api-middleware action
* Adds some functionality for
* - chaining actions to dispatch after success/fail of api callApi
* - converting payload from decamelized/stringified format on the way out
* - and camelized/objectized format on the way in
* - attaches the required json headers
* - includes auth token to backend server
* - inherrited from https://github.com/CodingZeal/react-boilerplate
*/

import { camelizeKeys, decamelizeKeys } from 'humps'
import {
  adjust,
  assoc,
  compose,
  contains,
  evolve,
  identity,
  ifElse,
  map,
  merge,
  mergeWith,
  prop,
  test
} from 'ramda'
import { CALL_API, ApiError, getJSON } from 'redux-api-middleware'

const defaultCallbacks = {
  onFailure: identity,
  onSuccess: identity
}
const defaultDependencies = {
  getJson: getJSON
}

export function callApi(call, callbacks = {}, dependencies = {}) {
  const mergedCallbacks = merge(defaultCallbacks, callbacks)
  const mergedDependencies = merge(defaultDependencies, dependencies)

  return dispatch =>
    dispatch({
      [CALL_API]: tranformCallDescriptor(call, mergedDependencies)
    }).then(response =>
      response && handleResponse(response, mergedCallbacks, dispatch)
    )
}

function handleResponse(response, callbacks, dispatch) {
  return response.error
    ? handleApiFailure(response, callbacks, dispatch)
    : handleApiSuccess(response, callbacks, dispatch)
}

function handleApiSuccess(response, { onSuccess }, dispatch) {
  return onSuccess(response, dispatch)
}

function handleApiFailure(response, { onFailure }, dispatch) {
  return onFailure(response, dispatch)
}

function tranformCallDescriptor(call, { getJson }) {
  const transform = compose(
    evolve({
      body: compose(JSON.stringify, decamelizeKeys),
      types: compose(
        adjust(tranformSuccessPayload(getJson), 1),
        adjust(transformFailurePayload(getJson), 2)
      )
    }),
    merge({
      method: 'GET'
    }),
    ifElse(
      compose(test(new RegExp(`^${API_URL}`)), prop('endpoint')), //Only include the auth token on reuqests to our server
      mergeWith(merge, { headers: setHeaders() }),
      mergeWith(merge, { headers: { 'Content-Type' : 'application/json' } })
    )
  )
  return transform(call)
}

function setHeaders() {
  return state => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.session.authToken}`
    }
  }
}

function tranformSuccessPayload(getJson) {
  return type => (
    {
      ...objectize(type),
      payload: (action, state, res) =>
        getJson(res).then(camelizeKeys).then(booleanizeValues)
    }
  )
}

function transformFailurePayload(getJson) {
  return type => (
    {
      ...objectize(type),
      payload: (action, state, res) => getJson(res).then(json =>
        new ApiError(res.status, res.statusText, camelizeKeys(json))
      )
    }
  )
}

function objectize(type) {
  return contains(typeof type, ['string', 'symbol'])
    ? { type }
    : type
}

/* eslint complexity: [1, 3] */
function booleanizeValues(payload) {
  const convertStringToBoolean = value => {
    switch (value) {
      case 'true':
        return true
      case 'false':
        return false
      default:
        return value
    }
  }
  const makeBoolean = value => {
    if (typeof value === 'object' && value !== null) {
      return map(makeBoolean, value)
    }
    return convertStringToBoolean(value)
  }

  return map(makeBoolean, payload)
}
