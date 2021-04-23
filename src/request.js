'use strict'

const canonicalize    = require('canonicalize')
const { stringify }   = require('querystring')
const { createHash }  = require('crypto')
const { jsonRequest } = require('@kravc/request')

const domain = 'https://portal.kra.vc/credentials/'

const getParametersDigest = (parameters = {}) => {
  const { mutation, ...query } = parameters

  const hasQuery   = Object.keys(query).length > 0
  const _parameters = {}

  if (hasQuery) {
    _parameters.query = stringify(query)
  }

  if (mutation) {
    _parameters.mutation = mutation
  }

  const canonized = canonicalize(_parameters)
  const digest = createHash('sha256').update(canonized).digest().toString('hex')

  return digest
}

const createAuthorization = (identity, parameters) => {
  const challenge    = getParametersDigest(parameters)
  const proofOptions = { domain, challenge }

  return identity.createPresentation([], { format: 'jwt', proofOptions })
}

const request = async (identity, operationId, parameters = {}) => {
  const authorization = await createAuthorization(identity, parameters)

  const options = {
    url:     `${domain}${operationId}`,
    headers: { authorization }
  }

  const { mutation, ...query } = parameters
  const hasQuery = Object.keys(query).length > 0

  if (hasQuery) {
    const queryString = stringify(query)
    options.url = `${options.url}?${queryString}`
  }

  if (mutation) {
    options.body = mutation
  }

  const { object: { data, error } } = await jsonRequest(console, options)

  if (error) {
    const err = new Error(error.message)
    err.originalError = error

    throw err
  }

  return data
}

module.exports = request
