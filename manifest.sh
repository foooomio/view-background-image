#!/bin/bash

set -euo pipefail

case "$1" in
  'chrome')
    jq '.background|={"service_worker": "background.js"}' < src/manifest.json | \
    jq '.incognito|="split"' | \
    jq 'del(.browser_specific_settings)' > tmp/manifest.json
    mv tmp/manifest.json src/manifest.json
    yarn prettier --write src/manifest.json
    ;;
  'firefox')
    jq '.background|={"scripts": ["background.js"]}' < src/manifest.json | \
    jq 'del(.incognito)' | \
    jq '.browser_specific_settings|={"gecko":{"id":"{f1f7b448-d666-46c6-9dfa-3ee4c5c83578}"}}' > tmp/manifest.json
    mv tmp/manifest.json src/manifest.json
    yarn prettier --write src/manifest.json
    ;;
  *)
    echo 'Unknown argument'
    ;;
esac
