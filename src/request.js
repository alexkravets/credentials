'use strict'

const { stringify }   = require('querystring')
const { jsonRequest } = require('@kravc/request')

const baseUrl = 'https://api.dev.credentials.kra.vc/v1/'

const request = async (identity, operationId, parameters = {}) => {
  let url = `${baseUrl}${operationId}`

  const { mutation, ...query } = parameters
  const hasQuery = Object.keys(query).length > 0

  if (hasQuery) {
    const queryString = stringify(query)
    url = `${url}?${queryString}`
  }

  let body

  if (mutation) {
    body = JSON.stringify(mutation)
  }

  const token         = await identity.createAuthorization(url, body)
  const authorization = `Bearer ${token}`

  const options = { url, body, headers: { authorization } }

  const { object: { data, error } } = await jsonRequest(console, options)

  if (error) {
    const err = new Error(error.message)
    err.originalError = error

    throw err
  }

  return data
}

module.exports = request
