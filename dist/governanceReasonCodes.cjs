"use strict";
// ⚠️ GOVERNANCE SOURCE OF TRUTH
// This file is the single source of truth for governance reason codes.
// Consumed by Platform (TypeScript) and Mandate (CommonJS via build).
// No manual copying - use @outcome/shared package.
/**
 * Central governance / mandate reason codes — no free-text reasons outside this set.
 * Exported as npm package @outcome/shared for cross-repo consumption.
 */
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.GOVERNANCE_CHANNEL_KEYS = module.exports.CHANNEL_BLOCK_REASON_CODES = module.exports.GOVERNANCE_TIMING_REASONS = module.exports.ALL_GOVERNANCE_REASON_CODES = module.exports.MANDATE_WAIT_REVIEW = module.exports.MANDATE_WAIT_NBA_NO_ACTION = module.exports.MANDATE_WAIT_EMAIL_TIMING = module.exports.MANDATE_BLOCK_EMAIL_CONSENT = module.exports.MANDATE_BLOCK_EMAIL_POLICY = module.exports.MANDATE_BLOCK_ALL_POLICY = module.exports.MANDATE_WAIT_NO_CHANNEL = module.exports.MANDATE_WAIT_TIMING = module.exports.MANDATE_EMAIL_ALLOWED = module.exports.MANDATE_PRESENT_ALLOWED = module.exports.NBA_STATE_MISSING = module.exports.NBA_NO_ACTION = module.exports.GOVERNANCE_BUILD_FAILED = module.exports.GOVERNANCE_INVALID = module.exports.GOVERNANCE_MISSING = module.exports.INTENT_UNKNOWN = module.exports.INTENT_REVOKED = module.exports.CHANNEL_NO_AVAILABLE = module.exports.CHANNEL_POLICY_BLOCK = module.exports.CONSENT_EXPIRED = module.exports.CONSENT_MISSING = module.exports.CONSENT_REVOKED = module.exports.TIMING_COOLDOWN = module.exports.TIMING_EXPIRED = module.exports.TIMING_PASSIVE = module.exports.TIMING_OK = void 0;
module.exports.assertGovernanceReasonCode = assertGovernanceReasonCode;
module.exports.validateGovernanceV1 = validateGovernanceV1;
module.exports.deepFreezeGovernance = deepFreezeGovernance;
module.exports.TIMING_OK = "TIMING_OK";
module.exports.TIMING_PASSIVE = "TIMING_PASSIVE";
module.exports.TIMING_EXPIRED = "TIMING_EXPIRED";
module.exports.TIMING_COOLDOWN = "TIMING_COOLDOWN";
module.exports.CONSENT_REVOKED = "CONSENT_REVOKED";
module.exports.CONSENT_MISSING = "CONSENT_MISSING";
module.exports.CONSENT_EXPIRED = "CONSENT_EXPIRED";
module.exports.CHANNEL_POLICY_BLOCK = "CHANNEL_POLICY_BLOCK";
module.exports.CHANNEL_NO_AVAILABLE = "CHANNEL_NO_AVAILABLE";
module.exports.INTENT_REVOKED = "INTENT_REVOKED";
module.exports.INTENT_UNKNOWN = "INTENT_UNKNOWN";
module.exports.GOVERNANCE_MISSING = "GOVERNANCE_MISSING";
module.exports.GOVERNANCE_INVALID = "GOVERNANCE_INVALID";
module.exports.GOVERNANCE_BUILD_FAILED = "GOVERNANCE_BUILD_FAILED";
module.exports.NBA_NO_ACTION = "NBA_NO_ACTION";
/** NBA / platform when required state objects absent */
module.exports.NBA_STATE_MISSING = "NBA_STATE_MISSING";
/** Mandate outcomes (primary decision.reason) */
module.exports.MANDATE_PRESENT_ALLOWED = "MANDATE_PRESENT_ALLOWED";
module.exports.MANDATE_EMAIL_ALLOWED = "MANDATE_EMAIL_ALLOWED";
module.exports.MANDATE_WAIT_TIMING = "MANDATE_WAIT_TIMING";
module.exports.MANDATE_WAIT_NO_CHANNEL = "MANDATE_WAIT_NO_CHANNEL";
module.exports.MANDATE_BLOCK_ALL_POLICY = "MANDATE_BLOCK_ALL_POLICY";
module.exports.MANDATE_BLOCK_EMAIL_POLICY = "MANDATE_BLOCK_EMAIL_POLICY";
module.exports.MANDATE_BLOCK_EMAIL_CONSENT = "MANDATE_BLOCK_EMAIL_CONSENT";
module.exports.MANDATE_WAIT_EMAIL_TIMING = "MANDATE_WAIT_EMAIL_TIMING";
module.exports.MANDATE_WAIT_NBA_NO_ACTION = "MANDATE_WAIT_NBA_NO_ACTION";
module.exports.MANDATE_WAIT_REVIEW = "MANDATE_WAIT_REVIEW";
module.exports.ALL_GOVERNANCE_REASON_CODES = [
    module.exports.TIMING_OK,
    module.exports.TIMING_PASSIVE,
    module.exports.TIMING_EXPIRED,
    module.exports.TIMING_COOLDOWN,
    module.exports.CONSENT_REVOKED,
    module.exports.CONSENT_MISSING,
    module.exports.CONSENT_EXPIRED,
    module.exports.CHANNEL_POLICY_BLOCK,
    module.exports.CHANNEL_NO_AVAILABLE,
    module.exports.INTENT_REVOKED,
    module.exports.INTENT_UNKNOWN,
    module.exports.GOVERNANCE_MISSING,
    module.exports.GOVERNANCE_INVALID,
    module.exports.GOVERNANCE_BUILD_FAILED,
    module.exports.NBA_NO_ACTION,
    module.exports.NBA_STATE_MISSING,
    module.exports.MANDATE_PRESENT_ALLOWED,
    module.exports.MANDATE_EMAIL_ALLOWED,
    module.exports.MANDATE_WAIT_TIMING,
    module.exports.MANDATE_WAIT_NO_CHANNEL,
    module.exports.MANDATE_BLOCK_ALL_POLICY,
    module.exports.MANDATE_BLOCK_EMAIL_POLICY,
    module.exports.MANDATE_BLOCK_EMAIL_CONSENT,
    module.exports.MANDATE_WAIT_EMAIL_TIMING,
    module.exports.MANDATE_WAIT_NBA_NO_ACTION,
    module.exports.MANDATE_WAIT_REVIEW,
];
/** Allowed values for governance.timing.reason_code (includes consent revocation per timing rules). */
module.exports.GOVERNANCE_TIMING_REASONS = new Set([
    module.exports.TIMING_OK,
    module.exports.TIMING_PASSIVE,
    module.exports.TIMING_EXPIRED,
    module.exports.TIMING_COOLDOWN,
    module.exports.CONSENT_REVOKED,
]);
/** Allowed in channels.*.block_reasons only (not timing, not mandate outcomes). */
module.exports.CHANNEL_BLOCK_REASON_CODES = new Set([
    module.exports.CONSENT_REVOKED,
    module.exports.CONSENT_MISSING,
    module.exports.CONSENT_EXPIRED,
    module.exports.CHANNEL_POLICY_BLOCK,
    module.exports.CHANNEL_NO_AVAILABLE,
    module.exports.INTENT_REVOKED,
    module.exports.INTENT_UNKNOWN,
]);
module.exports.GOVERNANCE_CHANNEL_KEYS = ["email", "whatsapp", "linkedin", "phone"];
function isIntentTimingSignal(s) {
    return s === "active_now" || s === "exploring" || s === "passive" || s === "unknown";
}
function isIntentConsentState(s) {
    return s === "granted" || s === "limited" || s === "revoked" || s === "unknown";
}
const ALL_CODES_SET = new Set(module.exports.ALL_GOVERNANCE_REASON_CODES);
function assertGovernanceReasonCode(code) {
    if (!ALL_CODES_SET.has(code)) {
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:invalid_reason_code:${code}`);
    }
}
/** Throws Error with message starting GOVERNANCE_INVALID if contract violated. */
function validateGovernanceV1(gov) {
    var _a, _b, _c;
    if (!gov || typeof gov !== "object") {
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:not_object`);
    }
    const g = gov;
    if (g.version !== "governance_v1")
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:version`);
    if (typeof g.tenant_id !== "string" || !g.tenant_id.trim()) {
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:tenant_id`);
    }
    if (!("actor_id" in g))
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:actor_id`);
    if (g.actor_id !== null && typeof g.actor_id !== "string") {
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:actor_id_type`);
    }
    if (typeof g.candidate_id !== "string" || !g.candidate_id.trim()) {
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:candidate_id`);
    }
    const cs = g.context_state;
    if (!cs || typeof cs !== "object")
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:context_state`);
    const cso = cs;
    const phases = ["SOURCING", "INTAKE", "ACTIVE_PROCESS", "ON_HOLD", "IDLE"];
    if (!phases.includes(cso.phase))
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:phase`);
    if (typeof cso.active_conversation !== "boolean")
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:active_conversation`);
    if (cso.intake_status !== null && typeof cso.intake_status !== "string") {
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:intake_status`);
    }
    const intent = g.intent;
    if (!intent || typeof intent !== "object")
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:intent`);
    const io = intent;
    const ts = String((_a = io.timing_signal) !== null && _a !== void 0 ? _a : "");
    if (!isIntentTimingSignal(ts))
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:timing_signal`);
    const cst = String((_b = io.consent_state) !== null && _b !== void 0 ? _b : "");
    if (!isIntentConsentState(cst))
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:consent_state`);
    if (io.intent_state_expires_at !== null && typeof io.intent_state_expires_at !== "string") {
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:intent_state_expires_at`);
    }
    const timing = g.timing;
    if (!timing || typeof timing !== "object")
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:timing`);
    const to = timing;
    if (typeof to.suitable !== "boolean")
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:timing_suitable`);
    const trc = String((_c = to.reason_code) !== null && _c !== void 0 ? _c : "");
    if (!module.exports.GOVERNANCE_TIMING_REASONS.has(trc))
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:timing_reason_code`);
    const ch = g.channels;
    if (!ch || typeof ch !== "object")
        throw new Error(`${module.exports.GOVERNANCE_INVALID}:channels`);
    for (const key of module.exports.GOVERNANCE_CHANNEL_KEYS) {
        const row = ch[key];
        if (!row || typeof row !== "object")
            throw new Error(`${module.exports.GOVERNANCE_INVALID}:channel_${key}`);
        const r = row;
        if (typeof r.policy_allowed !== "boolean")
            throw new Error(`${module.exports.GOVERNANCE_INVALID}:channel_${key}_policy`);
        if (typeof r.consent_effective !== "boolean") {
            throw new Error(`${module.exports.GOVERNANCE_INVALID}:channel_${key}_consent`);
        }
        if (!Array.isArray(r.block_reasons))
            throw new Error(`${module.exports.GOVERNANCE_INVALID}:channel_${key}_blocks`);
        const blocked = r.policy_allowed !== true || r.consent_effective !== true;
        if (blocked && r.block_reasons.length === 0) {
            throw new Error(`${module.exports.GOVERNANCE_INVALID}:channel_${key}_block_reasons_empty`);
        }
        if (!blocked && r.block_reasons.length !== 0) {
            throw new Error(`${module.exports.GOVERNANCE_INVALID}:channel_${key}_block_reasons_must_be_empty`);
        }
        for (const br of r.block_reasons) {
            if (typeof br !== "string" || !module.exports.CHANNEL_BLOCK_REASON_CODES.has(br)) {
                throw new Error(`${module.exports.GOVERNANCE_INVALID}:channel_${key}_invalid_block_code`);
            }
        }
    }
}
function deepFreezeGovernance(obj) {
    if (obj === null || typeof obj !== "object")
        return obj;
    Object.getOwnPropertyNames(obj).forEach((prop) => {
        const v = obj[prop];
        if (v !== null && typeof v === "object")
            deepFreezeGovernance(v);
    });
    return Object.freeze(obj);
}
