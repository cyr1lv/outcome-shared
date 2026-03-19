# @outcome/shared Versioning Guide

## Version Rules

Follow [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

### PATCH (1.0.x)
**Non-breaking changes:**
- ✅ New constants added
- ✅ New exports added (functions, types)
- ✅ Documentation updates
- ✅ Bug fixes that don't change behavior

**Example:**
```typescript
// v1.0.0 → v1.0.1
export const NEW_TIMING_SIGNAL = "NEW_TIMING_SIGNAL"; // ✅ Safe addition
```

### MINOR (1.x.0)
**Backward-compatible feature additions:**
- ✅ New exports (constants, functions, types)
- ✅ New optional parameters
- ✅ Enhanced functionality without breaking existing code

**Example:**
```typescript
// v1.0.0 → v1.1.0
export function newValidationFunction(input: string): boolean { ... } // ✅ New function
```

### MAJOR (x.0.0)
**Breaking changes:**
- ❌ Rename constants
- ❌ Remove constants
- ❌ Change function signatures
- ❌ Change type definitions
- ❌ Remove exports

**Example:**
```typescript
// v1.0.0 → v2.0.0
export const TIMING_OK = "TIMING_OK_V2"; // ❌ BREAKING: constant value changed
// OR
export const OLD_CONSTANT = "OLD"; // ❌ BREAKING: constant removed
```

## Release Process

### 1. Make Changes
```bash
cd outcome-shared-setup
# Edit src/governanceReasonCodes.ts
```

### 2. Update Version
```bash
# Edit package.json: "version": "1.0.1" (or 1.1.0, 2.0.0)
```

### 3. Build
```bash
npm run build
```

### 4. Commit & Tag
```bash
git add .
git commit -m "feat: add NEW_CONSTANT (v1.0.1)"
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

### 5. Update Consumers
Update `package.json` in Platform and Mandate:
```json
{
  "dependencies": {
    "@outcome/shared": "git+https://github.com/cyr1lv/outcome-shared.git#v1.0.1"
  }
}
```

### 6. Deploy
- Deploy Platform
- Deploy Mandate
- Verify both services start correctly
- Check logs for `OUTCOME_SHARED_VERSION`

## Compatibility Check

Services automatically verify required constants at startup:

```typescript
// Platform/Mandate startup
logOutcomeSharedVersion("platform"); // Logs version
verifyOutcomeSharedContract(); // Throws if constants missing
```

If a required constant is missing, the service will fail to start with:
```
SHARED_CONTRACT_VIOLATION: Required constants missing from @outcome/shared: TIMING_OK
```

## Required Constants

These constants **must** be present in all versions:
- `TIMING_OK`
- `CONSENT_REVOKED`
- `GOVERNANCE_BUILD_FAILED`
- `validateGovernanceV1` (function)

## Migration Guide

### Upgrading Patch Version (1.0.x → 1.0.y)
1. Update `package.json`: `#v1.0.y`
2. Run `npm install`
3. Deploy (no code changes needed)

### Upgrading Minor Version (1.x.0 → 1.y.0)
1. Update `package.json`: `#v1.y.0`
2. Run `npm install`
3. Review changelog for new exports
4. Update code to use new features (optional)
5. Deploy

### Upgrading Major Version (x.0.0 → y.0.0)
1. **Review breaking changes**
2. Update `package.json`: `#vy.0.0`
3. Run `npm install`
4. **Update all imports/usage** (renamed/removed constants)
5. Test thoroughly
6. Deploy Platform and Mandate together

## Best Practices

1. **Always tag releases** - Never push untagged changes
2. **Update both services together** - Platform and Mandate should use the same version
3. **Test before tagging** - Build and verify locally
4. **Document breaking changes** - Update CHANGELOG.md for major versions
5. **Fail fast** - Services verify contract at startup

## Example Workflow

```bash
# 1. Make change
echo 'export const NEW_CONSTANT = "NEW";' >> src/governanceReasonCodes.ts

# 2. Update version
# package.json: "version": "1.0.1"

# 3. Build
npm run build

# 4. Test locally
node -e "const { NEW_CONSTANT } = require('./dist/governanceReasonCodes.cjs'); console.log(NEW_CONSTANT);"

# 5. Commit & tag
git add .
git commit -m "feat: add NEW_CONSTANT (v1.0.1)"
git tag v1.0.1
git push origin main
git push origin v1.0.1

# 6. Update Platform
cd ../repos/Platform
# Edit package.json: "@outcome/shared": "git+...git#v1.0.1"
npm install
# Test, deploy

# 7. Update Mandate (when ready)
cd ../repos/Mandate
# Edit package.json: "@outcome/shared": "git+...git#v1.0.1"
npm install
# Test, deploy
```
