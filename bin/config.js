#!/usr/bin/env node

'use strict'

const portal = require('../src')

const ROOT_PATH = process.cwd()

const config = async (issuerJsonPath, credentialTypeJsonPath) => {
  const identity = await portal.getIdentity()
  console.log('Administrator:', identity.did)

  let issuer
  let issuerId

  if (issuerJsonPath) {
    issuer   = require(`${ROOT_PATH}/${issuerJsonPath}`)
    issuerId = await portal.getIssuer(identity, issuer)

    console.log('Issuer:', issuerId)
  }

  let credentialType

  if (credentialTypeJsonPath) {
    credentialType         = require(`${ROOT_PATH}/${credentialTypeJsonPath}`)
    const credentialTypeId = await portal.getCredentialType(identity, issuerId, credentialType)

    console.log('Credential:', credentialTypeId)
  }

  const isNoParameters = !issuer || !credentialType
  if (isNoParameters) {
    console.info('\nportal [ISSUER_JSON_PATH] [CREDENTIAL_TYPE_JSON_PATH]\n')
    console.info('Parameters:')
    console.info('  ISSUER_JSON_PATH            Path to JSON file with issuer attributes')
    console.info('  CREDENTIAL_TYPE_JSON_PATH   Path to JSON file with credential type attributes')
  }
}

const issuerJsonPath         = process.argv[2]
const credentialTypeJsonPath = process.argv[3]

config(issuerJsonPath, credentialTypeJsonPath)
