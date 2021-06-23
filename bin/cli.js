#!/usr/bin/env node

'use strict'

const crypto           = require('crypto')
const portal           = require('../src')
const { resolve }      = require('path')
const { Identity }     = require('@kravc/identity')
const { readFileSync } = require('fs')

const ROOT_PATH = process.cwd()

const seed = () => {
  const seedHex = crypto.randomBytes(Identity.SEED_LENGTH).toString('hex')
  console.log(seedHex)
}

const config = async (issuerJsonPath = 'issuer.json') => {
  const identity = await portal.getIdentity()

  // TODO: Validate issuer configuration againt schema:
  const issuer = require(`${ROOT_PATH}/${issuerJsonPath}`)

  const { iconPath, credentialTypes = [], ...issuerAttributes } = issuer

  const path = resolve(iconPath)
  const icon = readFileSync(path).toString('base64')

  const issuerId = await portal.getIssuer(identity, { ...issuerAttributes, icon })

  console.log('Issuer:', issuerId)

  const hasCredentialTypes = credentialTypes.length > 0

  if (!hasCredentialTypes) {
    return
  }

  console.log('Credentials:')
  for (const credentialTypeAttributes of credentialTypes) {
    const credentialTypeId = await portal.getCredentialType(identity, issuerId, credentialTypeAttributes)

    console.log(' -', credentialTypeId)
  }
}

const parameter = process.argv[2]

if (parameter === 'seed') {
  seed()

  process.exit(0)
}

config(parameter)
