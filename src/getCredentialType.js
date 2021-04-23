'use strict'

const request = require('./request')

const createCredentialType = async (identity, issuerId, payload) => {
  return request(identity, 'CreateCredentialType', { mutation: { issuerId, ...payload } })
}

const indexCredentialTypes = async (identity, issuerId) => {
  return request(identity, 'IndexCredentialTypes', { issuerId })
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
