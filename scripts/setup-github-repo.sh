#!/bin/bash
set -e

# Load GitHub token and owner from .env
ENV_FILE="/Users/macstudio/ai-node/.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file not found at $ENV_FILE"
  exit 1
fi

GITHUB_TOKEN=$(grep "^GITHUB_TOKEN=" "$ENV_FILE" | cut -d '=' -f2)
GITHUB_OWNER=$(grep "^GITHUB_OWNER=" "$ENV_FILE" | cut -d '=' -f2)

if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN not found in .env"
  exit 1
fi

if [ -z "$GITHUB_OWNER" ]; then
  echo "Error: GITHUB_OWNER not found in .env"
  exit 1
fi

echo "Using GitHub token for owner: $GITHUB_OWNER"

# Check if repository already exists
REPO_NAME="outcome-shared"
REPO_URL="https://api.github.com/repos/${GITHUB_OWNER}/${REPO_NAME}"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "$REPO_URL")

if [ "$HTTP_CODE" = "200" ]; then
  echo "Repository ${GITHUB_OWNER}/${REPO_NAME} already exists"
else
  echo "Creating repository ${GITHUB_OWNER}/${REPO_NAME}..."
  curl -X POST \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos \
    -d "{\"name\":\"${REPO_NAME}\",\"private\":false,\"description\":\"Shared governance reason codes for Platform and Mandate services\"}"
  echo ""
  echo "Repository created successfully"
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

# Add all files
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo "No changes to commit"
else
  echo "Committing changes..."
  git commit -m "Initial commit: @outcome/shared package"
fi

# Add remote if not exists
if ! git remote get-url origin > /dev/null 2>&1; then
  echo "Adding remote origin..."
  git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_OWNER}/${REPO_NAME}.git"
else
  echo "Remote origin already exists, updating URL..."
  git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_OWNER}/${REPO_NAME}.git"
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main || git push -u origin master || {
  echo "Creating main branch..."
  git branch -M main
  git push -u origin main
}

echo ""
echo "✅ Repository setup complete!"
echo "Repository URL: https://github.com/${GITHUB_OWNER}/${REPO_NAME}"
