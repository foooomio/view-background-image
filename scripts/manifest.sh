#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

cp "src/manifest.$1.json" src/manifest.json
