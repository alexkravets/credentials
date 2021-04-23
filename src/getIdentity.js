'use strict'

const crypto           = require('crypto')
const keychain         = require('keychain')
const { Identity }     = require('@kravc/identity')
const { resolve }      = require('path')
const { readFileSync } = require('fs')

const generateSeed = () => crypto.randomBytes(Identity.SEED_LENGTH).toString('hex')

const getPasswordAsync = (options) => new global.Promise((resolve, reject) => {
  keychain.getPassword(options, (err, val) => err ? reject(err) : resolve(val))
})

const setPasswordAsync = (options) => new global.Promise((resolve, reject) => {
  keychain.setPassword(options, err => err ? reject(err) : resolve())
})

const getIdentityFromKeychain = async () => {
  const keychainParameters = {
    service: '@portal/identity',
    account: 'default'
  }

  let seed

  try {
    seed = await getPasswordAsync(keychainParameters)

  } catch (error) {
    const isPasswordNotFound = error.type === 'PasswordNotFoundError'

    if (!isPasswordNotFound) {
      throw error
    }
  }

  if (!seed) {
    seed = generateSeed()
    await setPasswordAsync({ ...keychainParameters, password: seed })
  }

  const identity = await Identity.fromSeed(seed)

  return identity
}

const getIdentityFromFile = async () => {
  const path = resolve('.portal.json')
  const json = readFileSync(path).toString()

  const { default: seed } = JSON.parse(json)

  const identity = await Identity.fromSeed(seed)

  return identity
}

const getIdentity = async () => {
  let identity

  try {
    identity = await getIdentityFromFile()
    console.log('Administrator[.portal.json]:', identity.did)

  } catch (error) {
    console.warn(error.message)

  }

  if (!identity) {
    identity = await getIdentityFromKeychain()
    console.log('Administrator[Keychain]:', identity.did)

  }

  return identity
}

module.exports = getIdentity
