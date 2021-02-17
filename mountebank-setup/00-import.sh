
#!/usr/bin/env bash

set -e

curl -i -X POST -H 'Content-Type: application/json' http://localhost:2525/imposters --data @imposter.json
curl -i -X POST -H 'Content-Type: application/json' http://localhost:2525/imposters/51101/stubs --data @proxy-stubs.json

