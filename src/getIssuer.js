'use strict'

const { jsonRequest }     = require('@kravc/request')
const createAuthorization = require('./createAuthorization')

const authorizationOptions = { domain: 'https://portal.kra.vc/credentials/' }

const createIssuer = async (identity, body) => {
  const parameters    = { mutation: body }
  const authorization = await createAuthorization(identity, parameters, authorizationOptions)

  const options = {
    url:     'https://portal.kra.vc/credentials/CreateIssuer',
    headers: { authorization },
    body
  }

  const { object: { data } } = await jsonRequest(console, options)

  return data
}

const indexIssuers = async (identity) => {
  const parameters    = {}
  const authorization = await createAuthorization(identity, parameters, authorizationOptions)

  const options = {
    url:     'https://portal.kra.vc/credentials/IndexIssuers',
    headers: { authorization }
  }

  const { object: { data } } = await jsonRequest(console, options)

  return data
}

const getIssuer = async (identity, payload) => {
  const issuers = await indexIssuers(identity)

  let issuer = issuers.find(i => i.title === payload.title)

  if (!issuer) {
    issuer = await createIssuer(identity, payload)
  }

  return issuer.id
}

module.exports = getIssuer
