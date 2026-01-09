#!/bin/bash

# Change to your project directory
cd ~/notary-app || exit

# Add all changes
git add .

# Commit with a message passed as an argument, default to "Updated"
COMMIT_MSG=${1:-"Updated"}
git commit -m "$COMMIT_MSG"

# Push to main branch
git push origin main
