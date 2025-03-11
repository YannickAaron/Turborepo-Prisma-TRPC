#!/usr/bin/env bash

# Remove all yarn.lock files
find . -type f -name "yarn.lock" -exec rm -f {} \;

# Remove all node_modules folders
find . -type d -name "node_modules" -exec rm -rf {} +

# Remove all .next folders
find . -type d -name ".next" -exec rm -rf {} +

# Remove all .next folders
find . -type d -name ".turbo" -exec rm -rf {} +
