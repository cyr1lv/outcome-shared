/**
 * Central governance / mandate reason codes — no free-text reasons outside this set.
 * Exported as npm package @outcome/shared for cross-repo consumption.
 */
export declare const TIMING_OK: "TIMING_OK";
export declare const TIMING_PASSIVE: "TIMING_PASSIVE";
export declare const TIMING_EXPIRED: "TIMING_EXPIRED";
export declare const TIMING_COOLDOWN: "TIMING_COOLDOWN";
export declare const CONSENT_REVOKED: "CONSENT_REVOKED";
export declare const CONSENT_MISSING: "CONSENT_MISSING";
export declare const CONSENT_EXPIRED: "CONSENT_EXPIRED";
export declare const CHANNEL_POLICY_BLOCK: "CHANNEL_POLICY_BLOCK";
export declare const CHANNEL_NO_AVAILABLE: "CHANNEL_NO_AVAILABLE";
export declare const INTENT_REVOKED: "INTENT_REVOKED";
export declare const INTENT_UNKNOWN: "INTENT_UNKNOWN";
export declare const GOVERNANCE_MISSING: "GOVERNANCE_MISSING";
export declare const GOVERNANCE_INVALID: "GOVERNANCE_INVALID";
export declare const GOVERNANCE_BUILD_FAILED: "GOVERNANCE_BUILD_FAILED";
export declare const NBA_NO_ACTION: "NBA_NO_ACTION";
/** NBA / platform when required state objects absent */
export declare const NBA_STATE_MISSING: "NBA_STATE_MISSING";
/** Mandate outcomes (primary decision.reason) */
export declare const MANDATE_PRESENT_ALLOWED: "MANDATE_PRESENT_ALLOWED";
export declare const MANDATE_EMAIL_ALLOWED: "MANDATE_EMAIL_ALLOWED";
export declare const MANDATE_WAIT_TIMING: "MANDATE_WAIT_TIMING";
export declare const MANDATE_WAIT_NO_CHANNEL: "MANDATE_WAIT_NO_CHANNEL";
export declare const MANDATE_BLOCK_ALL_POLICY: "MANDATE_BLOCK_ALL_POLICY";
export declare const MANDATE_BLOCK_EMAIL_POLICY: "MANDATE_BLOCK_EMAIL_POLICY";
export declare const MANDATE_BLOCK_EMAIL_CONSENT: "MANDATE_BLOCK_EMAIL_CONSENT";
export declare const MANDATE_WAIT_EMAIL_TIMING: "MANDATE_WAIT_EMAIL_TIMING";
export declare const MANDATE_WAIT_NBA_NO_ACTION: "MANDATE_WAIT_NBA_NO_ACTION";
export declare const MANDATE_WAIT_REVIEW: "MANDATE_WAIT_REVIEW";
export declare const ALL_GOVERNANCE_REASON_CODES: readonly ["TIMING_OK", "TIMING_PASSIVE", "TIMING_EXPIRED", "TIMING_COOLDOWN", "CONSENT_REVOKED", "CONSENT_MISSING", "CONSENT_EXPIRED", "CHANNEL_POLICY_BLOCK", "CHANNEL_NO_AVAILABLE", "INTENT_REVOKED", "INTENT_UNKNOWN", "GOVERNANCE_MISSING", "GOVERNANCE_INVALID", "GOVERNANCE_BUILD_FAILED", "NBA_NO_ACTION", "NBA_STATE_MISSING", "MANDATE_PRESENT_ALLOWED", "MANDATE_EMAIL_ALLOWED", "MANDATE_WAIT_TIMING", "MANDATE_WAIT_NO_CHANNEL", "MANDATE_BLOCK_ALL_POLICY", "MANDATE_BLOCK_EMAIL_POLICY", "MANDATE_BLOCK_EMAIL_CONSENT", "MANDATE_WAIT_EMAIL_TIMING", "MANDATE_WAIT_NBA_NO_ACTION", "MANDATE_WAIT_REVIEW"];
export type GovernanceReasonCode = (typeof ALL_GOVERNANCE_REASON_CODES)[number];
/** Allowed values for governance.timing.reason_code (includes consent revocation per timing rules). */
export declare const GOVERNANCE_TIMING_REASONS: Set<string>;
/** Allowed in channels.*.block_reasons only (not timing, not mandate outcomes). */
export declare const CHANNEL_BLOCK_REASON_CODES: Set<string>;
export declare const GOVERNANCE_CHANNEL_KEYS: readonly ["email", "whatsapp", "linkedin", "phone"];
export type GovernanceChannelKey = (typeof GOVERNANCE_CHANNEL_KEYS)[number];
export type GovernancePhase = "SOURCING" | "INTAKE" | "ACTIVE_PROCESS" | "ON_HOLD" | "IDLE";
export type IntentTimingSignal = "active_now" | "exploring" | "passive" | "unknown";
export type IntentConsentState = "granted" | "limited" | "revoked" | "unknown";
export type GovernanceChannelSnapshot = {
    policy_allowed: boolean;
    consent_effective: boolean;
    block_reasons: GovernanceReasonCode[];
};
/** Strict GovernanceV1 contract (intent has no confidence field per schema). */
export type GovernanceV1 = {
    version: "governance_v1";
    tenant_id: string;
    actor_id: string | null;
    candidate_id: string;
    context_state: {
        phase: GovernancePhase;
        active_conversation: boolean;
        intake_status: string | null;
    };
    intent: {
        timing_signal: IntentTimingSignal;
        consent_state: IntentConsentState;
        intent_state_expires_at: string | null;
    };
    channels: Record<GovernanceChannelKey, GovernanceChannelSnapshot>;
    timing: {
        suitable: boolean;
        reason_code: GovernanceReasonCode;
    };
};
export declare function assertGovernanceReasonCode(code: string): asserts code is GovernanceReasonCode;
/** Throws Error with message starting GOVERNANCE_INVALID if contract violated. */
export declare function validateGovernanceV1(gov: unknown): asserts gov is GovernanceV1;
export declare function deepFreezeGovernance<T extends object>(obj: T): T;
//# sourceMappingURL=governanceReasonCodes.d.ts.map