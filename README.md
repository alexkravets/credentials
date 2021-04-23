# @kravc/portal

Client for managing [Portal](https://portal.kra.vc/) issuers and verifiable
credential types.

## Quick Start

Install npm package as development dependency:

```sh
npm i --save-dev @kravc/portal
```

### Register Issuer

Create `./issuer.json` file containing issuer metadata, icon and credential
types, e.g:

```json
{
  "iconPath": "icon.png",
  "metadata": {
    "url":      "https://portal.kra.vc/minesweeper/",
    "title":    "Minesweeper",
    "subtitle": "Classic board puzzle",
    "category": "Games"
  },
  "credentialTypes": [
    {
      "name": "Score",
      "version": 1,
      "schemas": [
        {
          "name": "Player",
          "fields": [
            { "name": "id",                "$type": "string" },
            { "name": "hasVideoGameScore", "$type": "ref", "$ref": "VideoGameScore" }
          ]
        },
        {
          "name": "VideoGameScore",
          "fields": [
            { "name": "videoGame",      "$type": "ref", "$ref": "VideoGame" },
            { "name": "wins",           "$type": "integer" },
            { "name": "rounds",         "$type": "integer" },
            { "name": "winRate",        "$type": "integer" },
            { "name": "topScore",       "$type": "integer" },
            { "name": "topScoreJson",   "$type": "string" },
            { "name": "bestStreak",     "$type": "integer" },
            { "name": "bestStreakJson", "$type": "string" },
            { "name": "enduranceMs",    "$type": "integer" },
            { "name": "bestRoundMs",    "$type": "integer" },
            { "name": "bestRoundJson",  "$type": "string" },
            { "name": "averageRoundMs", "$type": "integer" },
            { "name": "dateStarted",    "$type": "dateTime" }
          ]
        },
        {
          "url":  "https://schema.org/",
          "name": "VideoGame",
          "fields": [
            { "name": "url",     "$type": "string" },
            { "name": "name",    "$type": "string" },
            { "name": "version", "$type": "string" }
          ]
        }
      ]
    }
  ]
}
```

Registers a new issuer on the `Portal`:

```sh
npx portal
```

If the script runs for the first time it generates key pair (DID) for the
administrator and stores it in the local keychain. This behavior could be
overriden by using `.portal.json` file. To preconfigure administrators identity
generate private key seed using command:

```sh
npx seed
```

Create `.portal.json` file replacing `DEFAULT_SEED` with the value generated
via seed command:

```json
{
  "default": "DEFAULT_SEED"
}
```

Make sure file is added to the `.gitignore` and is not committed. Check out
full set of files at [example/](/example) folder.
