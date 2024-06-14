#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

NAME="$(basename "$PWD")"
VERSION="$(jq -r .version src/manifest.json)"

rm -rf dist
mkdir -p dist

find . -name .DS_Store -delete

# for Chrome
yarn manifest:chrome
zip -r "dist/${NAME}-${VERSION}-chrome.zip" src

# for Firefox
yarn manifest:firefox
(
  cd src
  zip -r "../dist/${NAME}-${VERSION}-firefox.zip" ./*
)

yarn manifest:chrome
