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
exports.ALL_REQUIRED_APPROVERS = exports.ALL_RISK_TIERS = exports.GOVERNANCE_CHANNEL_KEYS = exports.CHANNEL_BLOCK_REASON_CODES = exports.GOVERNANCE_TIMING_REASONS = exports.ALL_GOVERNANCE_REASON_CODES = exports.MANDATE_WAIT_REVIEW = exports.MANDATE_WAIT_NBA_NO_ACTION = exports.MANDATE_WAIT_EMAIL_TIMING = exports.MANDATE_BLOCK_EMAIL_CONSENT = exports.MANDATE_BLOCK_EMAIL_POLICY = exports.MANDATE_BLOCK_ALL_POLICY = exports.MANDATE_WAIT_NO_CHANNEL = exports.MANDATE_WAIT_TIMING = exports.MANDATE_EMAIL_ALLOWED = exports.MANDATE_PRESENT_ALLOWED = exports.NBA_STATE_MISSING = exports.NBA_NO_ACTION = exports.GOVERNANCE_BUILD_FAILED = exports.GOVERNANCE_INVALID = exports.GOVERNANCE_MISSING = exports.INTENT_UNKNOWN = exports.INTENT_REVOKED = exports.CHANNEL_NO_AVAILABLE = exports.CHANNEL_POLICY_BLOCK = exports.CONSENT_EXPIRED = exports.CONSENT_MISSING = exports.CONSENT_REVOKED = exports.TIMING_COOLDOWN = exports.TIMING_EXPIRED = exports.TIMING_PASSIVE = exports.TIMING_OK = void 0;
exports.assertGovernanceReasonCode = assertGovernanceReasonCode;
exports.validateGovernanceV1 = validateGovernanceV1;
exports.deriveRiskTier = deriveRiskTier;
exports.validateMandateVerdictV2 = validateMandateVerdictV2;
exports.isGovernanceV2 = isGovernanceV2;
exports.validateGovernanceV2 = validateGovernanceV2;
exports.deepFreezeGovernance = deepFreezeGovernance;
exports.TIMING_OK = "TIMING_OK";
exports.TIMING_PASSIVE = "TIMING_PASSIVE";
exports.TIMING_EXPIRED = "TIMING_EXPIRED";
exports.TIMING_COOLDOWN = "TIMING_COOLDOWN";
exports.CONSENT_REVOKED = "CONSENT_REVOKED";
exports.CONSENT_MISSING = "CONSENT_MISSING";
exports.CONSENT_EXPIRED = "CONSENT_EXPIRED";
exports.CHANNEL_POLICY_BLOCK = "CHANNEL_POLICY_BLOCK";
exports.CHANNEL_NO_AVAILABLE = "CHANNEL_NO_AVAILABLE";
exports.INTENT_REVOKED = "INTENT_REVOKED";
exports.INTENT_UNKNOWN = "INTENT_UNKNOWN";
exports.GOVERNANCE_MISSING = "GOVERNANCE_MISSING";
exports.GOVERNANCE_INVALID = "GOVERNANCE_INVALID";
exports.GOVERNANCE_BUILD_FAILED = "GOVERNANCE_BUILD_FAILED";
exports.NBA_NO_ACTION = "NBA_NO_ACTION";
/** NBA / platform when required state objects absent */
exports.NBA_STATE_MISSING = "NBA_STATE_MISSING";
/** Mandate outcomes (primary decision.reason) */
exports.MANDATE_PRESENT_ALLOWED = "MANDATE_PRESENT_ALLOWED";
exports.MANDATE_EMAIL_ALLOWED = "MANDATE_EMAIL_ALLOWED";
exports.MANDATE_WAIT_TIMING = "MANDATE_WAIT_TIMING";
exports.MANDATE_WAIT_NO_CHANNEL = "MANDATE_WAIT_NO_CHANNEL";
exports.MANDATE_BLOCK_ALL_POLICY = "MANDATE_BLOCK_ALL_POLICY";
exports.MANDATE_BLOCK_EMAIL_POLICY = "MANDATE_BLOCK_EMAIL_POLICY";
exports.MANDATE_BLOCK_EMAIL_CONSENT = "MANDATE_BLOCK_EMAIL_CONSENT";
exports.MANDATE_WAIT_EMAIL_TIMING = "MANDATE_WAIT_EMAIL_TIMING";
exports.MANDATE_WAIT_NBA_NO_ACTION = "MANDATE_WAIT_NBA_NO_ACTION";
exports.MANDATE_WAIT_REVIEW = "MANDATE_WAIT_REVIEW";
exports.ALL_GOVERNANCE_REASON_CODES = [
    exports.TIMING_OK,
    exports.TIMING_PASSIVE,
    exports.TIMING_EXPIRED,
    exports.TIMING_COOLDOWN,
    exports.CONSENT_REVOKED,
    exports.CONSENT_MISSING,
    exports.CONSENT_EXPIRED,
    exports.CHANNEL_POLICY_BLOCK,
    exports.CHANNEL_NO_AVAILABLE,
    exports.INTENT_REVOKED,
    exports.INTENT_UNKNOWN,
    exports.GOVERNANCE_MISSING,
    exports.GOVERNANCE_INVALID,
    exports.GOVERNANCE_BUILD_FAILED,
    exports.NBA_NO_ACTION,
    exports.NBA_STATE_MISSING,
    exports.MANDATE_PRESENT_ALLOWED,
    exports.MANDATE_EMAIL_ALLOWED,
    exports.MANDATE_WAIT_TIMING,
    exports.MANDATE_WAIT_NO_CHANNEL,
    exports.MANDATE_BLOCK_ALL_POLICY,
    exports.MANDATE_BLOCK_EMAIL_POLICY,
    exports.MANDATE_BLOCK_EMAIL_CONSENT,
    exports.MANDATE_WAIT_EMAIL_TIMING,
    exports.MANDATE_WAIT_NBA_NO_ACTION,
    exports.MANDATE_WAIT_REVIEW,
];
/** Allowed values for governance.timing.reason_code (includes consent revocation per timing rules). */
exports.GOVERNANCE_TIMING_REASONS = new Set([
    exports.TIMING_OK,
    exports.TIMING_PASSIVE,
    exports.TIMING_EXPIRED,
    exports.TIMING_COOLDOWN,
    exports.CONSENT_REVOKED,
]);
/** Allowed in channels.*.block_reasons only (not timing, not mandate outcomes). */
exports.CHANNEL_BLOCK_REASON_CODES = new Set([
    exports.CONSENT_REVOKED,
    exports.CONSENT_MISSING,
    exports.CONSENT_EXPIRED,
    exports.CHANNEL_POLICY_BLOCK,
    exports.CHANNEL_NO_AVAILABLE,
    exports.INTENT_REVOKED,
    exports.INTENT_UNKNOWN,
]);
exports.GOVERNANCE_CHANNEL_KEYS = ["email", "whatsapp", "linkedin", "phone"];
function isIntentTimingSignal(s) {
    return s === "active_now" || s === "exploring" || s === "passive" || s === "unknown";
}
function isIntentConsentState(s) {
    return s === "granted" || s === "limited" || s === "revoked" || s === "unknown";
}
const ALL_CODES_SET = new Set(exports.ALL_GOVERNANCE_REASON_CODES);
function assertGovernanceReasonCode(code) {
    if (!ALL_CODES_SET.has(code)) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:invalid_reason_code:${code}`);
    }
}
/** Throws Error with message starting GOVERNANCE_INVALID if contract violated. */
function validateGovernanceV1(gov) {
    var _a, _b, _c;
    if (!gov || typeof gov !== "object") {
        throw new Error(`${exports.GOVERNANCE_INVALID}:not_object`);
    }
    const g = gov;
    if (g.version !== "governance_v1")
        throw new Error(`${exports.GOVERNANCE_INVALID}:version`);
    if (typeof g.tenant_id !== "string" || !g.tenant_id.trim()) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:tenant_id`);
    }
    if (!("actor_id" in g))
        throw new Error(`${exports.GOVERNANCE_INVALID}:actor_id`);
    if (g.actor_id !== null && typeof g.actor_id !== "string") {
        throw new Error(`${exports.GOVERNANCE_INVALID}:actor_id_type`);
    }
    if (typeof g.candidate_id !== "string" || !g.candidate_id.trim()) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:candidate_id`);
    }
    const cs = g.context_state;
    if (!cs || typeof cs !== "object")
        throw new Error(`${exports.GOVERNANCE_INVALID}:context_state`);
    const cso = cs;
    const phases = ["SOURCING", "INTAKE", "ACTIVE_PROCESS", "ON_HOLD", "IDLE"];
    if (!phases.includes(cso.phase))
        throw new Error(`${exports.GOVERNANCE_INVALID}:phase`);
    if (typeof cso.active_conversation !== "boolean")
        throw new Error(`${exports.GOVERNANCE_INVALID}:active_conversation`);
    if (cso.intake_status !== null && typeof cso.intake_status !== "string") {
        throw new Error(`${exports.GOVERNANCE_INVALID}:intake_status`);
    }
    const intent = g.intent;
    if (!intent || typeof intent !== "object")
        throw new Error(`${exports.GOVERNANCE_INVALID}:intent`);
    const io = intent;
    const ts = String((_a = io.timing_signal) !== null && _a !== void 0 ? _a : "");
    if (!isIntentTimingSignal(ts))
        throw new Error(`${exports.GOVERNANCE_INVALID}:timing_signal`);
    const cst = String((_b = io.consent_state) !== null && _b !== void 0 ? _b : "");
    if (!isIntentConsentState(cst))
        throw new Error(`${exports.GOVERNANCE_INVALID}:consent_state`);
    if (io.intent_state_expires_at !== null && typeof io.intent_state_expires_at !== "string") {
        throw new Error(`${exports.GOVERNANCE_INVALID}:intent_state_expires_at`);
    }
    const timing = g.timing;
    if (!timing || typeof timing !== "object")
        throw new Error(`${exports.GOVERNANCE_INVALID}:timing`);
    const to = timing;
    if (typeof to.suitable !== "boolean")
        throw new Error(`${exports.GOVERNANCE_INVALID}:timing_suitable`);
    const trc = String((_c = to.reason_code) !== null && _c !== void 0 ? _c : "");
    if (!exports.GOVERNANCE_TIMING_REASONS.has(trc))
        throw new Error(`${exports.GOVERNANCE_INVALID}:timing_reason_code`);
    const ch = g.channels;
    if (!ch || typeof ch !== "object")
        throw new Error(`${exports.GOVERNANCE_INVALID}:channels`);
    for (const key of exports.GOVERNANCE_CHANNEL_KEYS) {
        const row = ch[key];
        if (!row || typeof row !== "object")
            throw new Error(`${exports.GOVERNANCE_INVALID}:channel_${key}`);
        const r = row;
        if (typeof r.policy_allowed !== "boolean")
            throw new Error(`${exports.GOVERNANCE_INVALID}:channel_${key}_policy`);
        if (typeof r.consent_effective !== "boolean") {
            throw new Error(`${exports.GOVERNANCE_INVALID}:channel_${key}_consent`);
        }
        if (!Array.isArray(r.block_reasons))
            throw new Error(`${exports.GOVERNANCE_INVALID}:channel_${key}_blocks`);
        const blocked = r.policy_allowed !== true || r.consent_effective !== true;
        if (blocked && r.block_reasons.length === 0) {
            throw new Error(`${exports.GOVERNANCE_INVALID}:channel_${key}_block_reasons_empty`);
        }
        if (!blocked && r.block_reasons.length !== 0) {
            throw new Error(`${exports.GOVERNANCE_INVALID}:channel_${key}_block_reasons_must_be_empty`);
        }
        for (const br of r.block_reasons) {
            if (typeof br !== "string" || !exports.CHANNEL_BLOCK_REASON_CODES.has(br)) {
                throw new Error(`${exports.GOVERNANCE_INVALID}:channel_${key}_invalid_block_code`);
            }
        }
    }
}
exports.ALL_RISK_TIERS = ["LOW", "MEDIUM", "HIGH"];
exports.ALL_REQUIRED_APPROVERS = ["NONE", "RECRUITER", "HUMAN_MANDATORY"];
/**
 * Canonical tier derivation (§4.2 / §8.2 table). Returns null risk_tier only for
 * non-executable states (BLOCK/DENY_EXECUTE, or a legal-floor violation) — the
 * caller must not execute regardless of required_approver in that case.
 */
function deriveRiskTier(status, nbaState, harmLevel) {
    if (status === "BLOCK" || status === "DENY_EXECUTE" || nbaState === "BLOCK") {
        return { risk_tier: null, required_approver: "HUMAN_MANDATORY" };
    }
    if (harmLevel === "legal_edge") {
        return { risk_tier: "HIGH", required_approver: "HUMAN_MANDATORY" };
    }
    if (nbaState === "WAIT") {
        return { risk_tier: "MEDIUM", required_approver: "RECRUITER" };
    }
    // nbaState === "ALLOW"
    if (harmLevel === "company") {
        return { risk_tier: "MEDIUM", required_approver: "RECRUITER" };
    }
    return { risk_tier: "LOW", required_approver: "NONE" };
}
function validateMandateVerdictV2(v) {
    if (!v || typeof v !== "object")
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_not_object`);
    const o = v;
    if (o.version !== "mandate_verdict_v2")
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_version`);
    const statuses = ["ALLOW", "WAIT", "BLOCK", "DENY_EXECUTE"];
    if (!statuses.includes(o.status)) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_status`);
    }
    if (o.risk_tier !== null && !exports.ALL_RISK_TIERS.includes(o.risk_tier)) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_risk_tier`);
    }
    if (!exports.ALL_REQUIRED_APPROVERS.includes(o.required_approver)) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_required_approver`);
    }
    if ((o.status === "BLOCK" || o.status === "DENY_EXECUTE") && o.risk_tier !== null) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_risk_tier_must_be_null`);
    }
    if (!Array.isArray(o.reason_codes))
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_reason_codes`);
    for (const rc of o.reason_codes) {
        if (typeof rc !== "string" || !ALL_CODES_SET.has(rc)) {
            throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_invalid_reason_code`);
        }
    }
    if (!Array.isArray(o.capabilities))
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_capabilities`);
    if (typeof o.policy_version !== "string" || !o.policy_version.trim()) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:mandate_verdict_policy_version`);
    }
}
function isGovernanceV2(gov) {
    return !!gov && typeof gov === "object" && gov.version === "governance_v2";
}
/** Validates the v1 base contract, then the v2-additive fields when version === "governance_v2". */
function validateGovernanceV2(gov) {
    const g = gov;
    const v1Shape = { ...g, version: "governance_v1" };
    validateGovernanceV1(v1Shape);
    if (g.version !== "governance_v2")
        throw new Error(`${exports.GOVERNANCE_INVALID}:version`);
    if ("nba" in g && g.nba !== undefined) {
        const nba = g.nba;
        if (!nba || typeof nba !== "object")
            throw new Error(`${exports.GOVERNANCE_INVALID}:nba`);
        const nbaO = nba;
        const states = ["ALLOW", "WAIT", "BLOCK"];
        if (!states.includes(nbaO.state))
            throw new Error(`${exports.GOVERNANCE_INVALID}:nba_state`);
        if (typeof nbaO.conviction_score !== "number")
            throw new Error(`${exports.GOVERNANCE_INVALID}:nba_conviction_score`);
    }
    if (typeof g.action_type !== "string" || !g.action_type.trim()) {
        throw new Error(`${exports.GOVERNANCE_INVALID}:action_type`);
    }
    if ("contact_history" in g && g.contact_history !== undefined) {
        const ch = g.contact_history;
        if (!ch || typeof ch !== "object")
            throw new Error(`${exports.GOVERNANCE_INVALID}:contact_history`);
        if (!ch.count_by_channel || typeof ch.count_by_channel !== "object") {
            throw new Error(`${exports.GOVERNANCE_INVALID}:contact_history_count_by_channel`);
        }
        if (typeof ch.window_days !== "number")
            throw new Error(`${exports.GOVERNANCE_INVALID}:contact_history_window_days`);
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
