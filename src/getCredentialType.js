'use strict'

const { jsonRequest }     = require('@kravc/request')
const createAuthorization = require('./createAuthorization')

const authorizationOptions = { domain: 'https://portal.kra.vc/credentials/' }

const createCredentialType = async (identity, issuerId, payload) => {
  const body = { ...payload, issuerId }

  const parameters    = { mutation: body }
  const authorization = await createAuthorization(identity, parameters, authorizationOptions)

  const options = {
    url:     'https://portal.kra.vc/credentials/CreateCredentialType',
    headers: { authorization },
    body
  }

  const { object: { data } } = await jsonRequest(console, options)

  return data
}

const indexCredentialTypes = async (identity, issuerId) => {
  const parameters    = { issuerId }
  const authorization = await createAuthorization(identity, parameters, authorizationOptions)

  const options = {
    url:     `https://portal.kra.vc/credentials/IndexCredentialTypes?issuerId=${issuerId}`,
    headers: { authorization }
  }

  const { object: { data } } = await jsonRequest(console, options)

  return data
}

const getCreateCredentialType = async (identity, issuerId, payload) => {
  const credentialTypes = await indexCredentialTypes(identity, issuerId)

  let credentialType = credentialTypes.find(ct => ct.name === payload.name && ct.version === payload.version)

  if (!credentialType) {
    credentialType = await createCredentialType(identity, issuerId, payload)
  }

  return credentialType.id
}

module.exports = getCreateCredentialType
