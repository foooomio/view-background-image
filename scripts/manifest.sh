#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

case "$1" in
  'chrome')
    {
      jq '.background|={"service_worker": "background.js"}' |
      jq '.incognito|="split"' |
      jq 'del(.browser_specific_settings)'
    } < src/manifest.json > src/manifest.json.tmp
    mv src/manifest.json.tmp src/manifest.json
    yarn prettier --write src/manifest.json
    ;;
  'firefox')
    {
      jq '.background|={"scripts": ["background.js"]}' |
      jq 'del(.incognito)' |
      jq '.browser_specific_settings|={"gecko":{"id":"{f1f7b448-d666-46c6-9dfa-3ee4c5c83578}"}}'
    } < src/manifest.json > src/manifest.json.tmp
    mv src/manifest.json.tmp src/manifest.json
    yarn prettier --write src/manifest.json
    ;;
  *)
    echo 'Unknown argument'
    ;;
esac
