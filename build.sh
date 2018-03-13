#!/bin/sh

mkdir -p dist
rm dist/*.zip

# for Chrome
zip -r dist/chrome.zip src -x *.DS_Store
