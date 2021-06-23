# @kravc/credentials

CLI for [Credentials](https://api.credentials.kra.vc/v1/) service to manage
issuers and verifiable credentials.


## Quick Start

Install npm package as development dependency:

```sh
npm i --save-dev @kravc/credentials
```

### Register an Issuer

Create `./issuer.json` file with issuer metadata, icon and credential
types, e.g:

```json
{
  "iconPath": "icon.png",
  "metadata": {
    "url":      "https://apple.co/394ouT8",
    "title":    "Mines - Classic Bomb Puzzle",
    "subtitle": "Minesweeper logic board game",
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

Registers a new issuer:

```sh
npx credentials issuer.json
```

If the script runs for the first time it generates key pair (DID) for the
administrator and stores it in the local keychain. This behavior could be
overriden by using `.portal.json` file.

To pre-configure administrators identity, generate private key seed via:

```sh
npx credentials seed
```

Create `.portal.json` file replacing `DEFAULT_SEED` with the value generated
via seed command:

```json
{
  "default": "DEFAULT_SEED"
}
```

Make sure the file is added to the `.gitignore` and is not committed.
Check out full set of files at [example/](/example) folder.

---

Author: [Alexander Kravets](mailto:a@kra.vc)

Revision: June 23, 2021
