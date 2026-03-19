# Migration Guide: @outcome/shared Package

## Current Status

✅ Package structure created at: `/Users/macstudio/ai-node/outcome-shared-setup/`
✅ Build system working
✅ CommonJS output generated: `dist/governanceReasonCodes.cjs`
✅ TypeScript declarations: `dist/governanceReasonCodes.d.ts`

## Next Steps

### STEP 1: Create GitHub Repository

```bash
cd /Users/macstudio/ai-node/outcome-shared-setup
git init
git add .
git commit -m "Initial commit: @outcome/shared package"
git remote add origin git@github.com:cyr1lv/outcome-shared.git
git push -u origin main
```

### STEP 2: Update Platform to Use Package

```bash
cd /Users/macstudio/ai-node/repos/Platform

# Install package (git dependency for now)
pnpm add git+https://github.com/cyr1lv/outcome-shared.git

# Or if published to npm:
# pnpm add @outcome/shared
```

**Update imports in Platform:**
```typescript
// OLD:
import { TIMING_OK } from "../shared/governanceReasonCodes";

// NEW:
import { TIMING_OK } from "@outcome/shared";
```

**Files to update:**
- `src/decisionFlow/buildGovernanceContext.ts`
- `src/decisionFlow/runDecisionFlow.ts`
- `src/decisionFlow/buildGovernanceContext.test.ts`

**Remove local file:**
```bash
rm src/shared/governanceReasonCodes.ts
```

### STEP 3: Update Mandate Service

```bash
cd <mandate-service-repo>

# Install package
npm install git+https://github.com/cyr1lv/outcome-shared.git

# Or if published to npm:
# npm install @outcome/shared
```

**Update imports in Mandate:**
```javascript
// OLD:
const { TIMING_OK } = require("../../shared/governanceReasonCodes.cjs");

// NEW:
const { TIMING_OK } = require("@outcome/shared");
```

**Remove local copy:**
```bash
rm shared/governanceReasonCodes.cjs
```

### STEP 4: Remove Local Copies

```bash
# Remove from ai-node
rm /Users/macstudio/ai-node/shared/governanceReasonCodes.cjs
rm /Users/macstudio/ai-node/shared/README.md
```

### STEP 5: Verify

1. Both Platform and Mandate import from `@outcome/shared`
2. No local copies exist
3. Version is locked in `package.json`
4. No drift possible

## Publishing to npm (Optional)

If you want to publish to npm registry:

```bash
cd /Users/macstudio/ai-node/outcome-shared-setup
npm login
npm publish --access public
```

Then update package.json in consuming services:
```json
{
  "dependencies": {
    "@outcome/shared": "^1.0.0"
  }
}
```

## Maintenance

When updating reason codes:

1. Update `outcome-shared` repository
2. Commit and push changes
3. Update `package.json` version in outcome-shared
4. Tag release: `git tag v1.0.1 && git push --tags`
5. Update consuming services: `pnpm update @outcome/shared`
6. **No manual copying needed**
