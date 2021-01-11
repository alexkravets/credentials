'use strict'

const canonicalize   = require('canonicalize')
const { createHash } = require('crypto')

const getParametersDigest = (parameters) => {
  const canonized = canonicalize(parameters)
  const digest = createHash('sha256').update(canonized).digest().toString('hex')

  return digest
}

module.exports = getParametersDigest
