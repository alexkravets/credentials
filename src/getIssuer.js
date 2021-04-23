'use strict'

const request = require('./request')

const createIssuer = (identity, mutation) => {
  return request(identity, 'CreateIssuer', { mutation })
}

const indexIssuers = (identity) => {
  return request(identity, 'IndexIssuers')
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
