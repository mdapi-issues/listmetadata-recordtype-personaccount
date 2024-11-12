#!/usr/bin/env bash

set -eo pipefail

sf org create scratch -f config/project-scratch-def.json \
  --alias "mdapi-issues-recordtype-personaccount" \
  --set-default
sf project deploy start
