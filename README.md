# @kravc/portal

Client for managing [Portal](https://portal.kra.vc/about/) issuers and
verifiable credential types.

## Quick Start

Install npm package as development dependency:

```sh
npm i --save-dev @kravc/portal
```

On first run script generates key pair (DID) for administrator and stores it
in local keychain.

```sh
npx portal
```

### Create Issuer

Create `./issuer.json` file containing issuer attributes, here is an example:

```json
{
  "url":      "https://portal.kra.vc/minesweeper/",
  "title":    "Minesweeper",
  "category": "Game"
}
```

Register new issuer on the `Portal`:

```sh
npx portal ./issuer.json
```

### Create Credential Type

Create `./credentialType.json` file containing schemas for new credential type,
credential type name and its version, here is an example:

```json
{
  "name": "MinesweeperScore",
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
```

Register new credential type for previously created issuer on the `Portal`:

```sh
npx portal ./issuer.json ./credentialType.json
```
