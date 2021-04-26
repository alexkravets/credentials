'use strict'

const sha256          = require('js-sha256')
const { stringify }   = require('querystring')
const { jsonRequest } = require('@kravc/request')

const baseUrl = 'https://portal.kra.vc/credentials/'

const request = async (identity, operationId, parameters = {}) => {
  const options = {
    url: `${baseUrl}${operationId}`
  }

  const { mutation, ...query } = parameters
  const hasQuery = Object.keys(query).length > 0

  if (hasQuery) {
    const queryString = stringify(query)
    options.url = `${options.url}?${queryString}`
  }

  const proofOptions = { domain: options.url }

  if (mutation) {
    options.body = JSON.stringify(mutation)
    proofOptions.challenge = sha256(options.body)
  }

  options.headers.Authorization =
    await identity.createPresentation([], { format: 'jwt', proofOptions })

  const { object: { data, error } } = await jsonRequest(console, options)

  if (error) {
    const err = new Error(error.message)
    err.originalError = error

    throw err
  }

  return data
}

module.exports = request
