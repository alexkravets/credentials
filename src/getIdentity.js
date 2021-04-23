'use strict'

const crypto       = require('crypto')
const keychain     = require('keychain')
const { Identity } = require('@kravc/identity')

const generateSeed = () => crypto.randomBytes(Identity.SEED_LENGTH).toString('hex')

const getPasswordAsync = (options) => new global.Promise((resolve, reject) => {
  keychain.getPassword(options, (err, val) => err ? reject(err) : resolve(val))
})

const setPasswordAsync = (options) => new global.Promise((resolve, reject) => {
  keychain.setPassword(options, err => err ? reject(err) : resolve())
})

const getIdentity = async () => {
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

module.exports = getIdentity
