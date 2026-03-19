# @outcome/shared

Shared governance reason codes and types for Platform and Mandate services.

## Purpose

Single source of truth for governance reason codes to eliminate cross-repo drift.

## Installation

### Option A: npm registry (when published)
```bash
npm install @outcome/shared
```

### Option B: git dependency (current)
```bash
npm install git+https://github.com/cyr1lv/outcome-shared.git
```

## Usage

### TypeScript (Platform)
```typescript
import { TIMING_OK, CONSENT_REVOKED } from "@outcome/shared";
```

### CommonJS (Mandate)
```javascript
const { TIMING_OK, CONSENT_REVOKED } = require("@outcome/shared");
```

## Development

### Build
```bash
npm run build
```

This generates:
- `dist/governanceReasonCodes.cjs` - CommonJS version
- `dist/governanceReasonCodes.d.ts` - TypeScript declarations

### Publish
```bash
npm publish
```

## Migration from Local Copies

See: `repos/Platform/docs/OUTCOME-SHARED-MIGRATION.md`
