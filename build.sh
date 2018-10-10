#!/bin/bash

NAME="view-background-image"
VERSION=$(jq -r .version src/manifest.json)

mkdir -p dist
rm dist/*.zip

# for Chrome
zip -r "dist/${NAME}-${VERSION}.zip" src -x "*.DS_Store"
