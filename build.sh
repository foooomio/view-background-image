#!/bin/bash

set -euo pipefail

NAME="view-background-image"
VERSION="$(jq -r .version src/manifest.json)"

rm -rf dist
mkdir -p dist

# for Chrome
./manifest.sh chrome
zip -r "dist/${NAME}-${VERSION}-chrome.zip" src -x "*.DS_Store"

# for Firefox
./manifest.sh firefox
cd src
zip -r "../dist/${NAME}-${VERSION}-firefox.zip" * -x "*.DS_Store"

cd ..
./manifest.sh chrome
