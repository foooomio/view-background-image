#!/bin/bash

set -eux

NAME="view-background-image"
VERSION="$(jq -r .version src/manifest.json)"

mkdir -p dist
rm dist/*.zip

# for Chrome
zip -r "dist/${NAME}-${VERSION}-chrome.zip" src -x "*.DS_Store"

# for Firefox
cd src
sed -i -e 's/"service_worker": "background.js"/"scripts": \["background.js"\]/' manifest.json

zip -r "../dist/${NAME}-${VERSION}-firefox.zip" * -x "*.DS_Store"

sed -i -e 's/"scripts": \["background.js"\]/"service_worker": "background.js"/' manifest.json
