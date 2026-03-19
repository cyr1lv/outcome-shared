// ⚠️ GOVERNANCE SOURCE OF TRUTH
// This file is the single source of truth for governance reason codes.
// Consumed by Platform (TypeScript) and Mandate (CommonJS via build).
// No manual copying - use @outcome/shared package.
/**
 * Central governance / mandate reason codes — no free-text reasons outside this set.
 * Exported as npm package @outcome/shared for cross-repo consumption.
 */

export const TIMING_OK = "TIMING_OK" as const;
export const TIMING_PASSIVE = "TIMING_PASSIVE" as const;
export const TIMING_EXPIRED = "TIMING_EXPIRED" as const;
export const TIMING_COOLDOWN = "TIMING_COOLDOWN" as const;

export const CONSENT_REVOKED = "CONSENT_REVOKED" as const;
export const CONSENT_MISSING = "CONSENT_MISSING" as const;
export const CONSENT_EXPIRED = "CONSENT_EXPIRED" as const;

export const CHANNEL_POLICY_BLOCK = "CHANNEL_POLICY_BLOCK" as const;
export const CHANNEL_NO_AVAILABLE = "CHANNEL_NO_AVAILABLE" as const;

export const INTENT_REVOKED = "INTENT_REVOKED" as const;
export const INTENT_UNKNOWN = "INTENT_UNKNOWN" as const;

export const GOVERNANCE_MISSING = "GOVERNANCE_MISSING" as const;
export const GOVERNANCE_INVALID = "GOVERNANCE_INVALID" as const;
export const GOVERNANCE_BUILD_FAILED = "GOVERNANCE_BUILD_FAILED" as const;

export const NBA_NO_ACTION = "NBA_NO_ACTION" as const;

/** NBA / platform when required state objects absent */
export const NBA_STATE_MISSING = "NBA_STATE_MISSING" as const;

/** Mandate outcomes (primary decision.reason) */
export const MANDATE_PRESENT_ALLOWED = "MANDATE_PRESENT_ALLOWED" as const;
export const MANDATE_EMAIL_ALLOWED = "MANDATE_EMAIL_ALLOWED" as const;
export const MANDATE_WAIT_TIMING = "MANDATE_WAIT_TIMING" as const;
export const MANDATE_WAIT_NO_CHANNEL = "MANDATE_WAIT_NO_CHANNEL" as const;
export const MANDATE_BLOCK_ALL_POLICY = "MANDATE_BLOCK_ALL_POLICY" as const;
export const MANDATE_BLOCK_EMAIL_POLICY = "MANDATE_BLOCK_EMAIL_POLICY" as const;
export const MANDATE_BLOCK_EMAIL_CONSENT = "MANDATE_BLOCK_EMAIL_CONSENT" as const;
export const MANDATE_WAIT_EMAIL_TIMING = "MANDATE_WAIT_EMAIL_TIMING" as const;
export const MANDATE_WAIT_NBA_NO_ACTION = "MANDATE_WAIT_NBA_NO_ACTION" as const;
export const MANDATE_WAIT_REVIEW = "MANDATE_WAIT_REVIEW" as const;

export const ALL_GOVERNANCE_REASON_CODES = [
  TIMING_OK,
  TIMING_PASSIVE,
  TIMING_EXPIRED,
  TIMING_COOLDOWN,
  CONSENT_REVOKED,
  CONSENT_MISSING,
  CONSENT_EXPIRED,
  CHANNEL_POLICY_BLOCK,
  CHANNEL_NO_AVAILABLE,
  INTENT_REVOKED,
  INTENT_UNKNOWN,
  GOVERNANCE_MISSING,
  GOVERNANCE_INVALID,
  GOVERNANCE_BUILD_FAILED,
  NBA_NO_ACTION,
  NBA_STATE_MISSING,
  MANDATE_PRESENT_ALLOWED,
  MANDATE_EMAIL_ALLOWED,
  MANDATE_WAIT_TIMING,
  MANDATE_WAIT_NO_CHANNEL,
  MANDATE_BLOCK_ALL_POLICY,
  MANDATE_BLOCK_EMAIL_POLICY,
  MANDATE_BLOCK_EMAIL_CONSENT,
  MANDATE_WAIT_EMAIL_TIMING,
  MANDATE_WAIT_NBA_NO_ACTION,
  MANDATE_WAIT_REVIEW,
] as const;

export type GovernanceReasonCode = (typeof ALL_GOVERNANCE_REASON_CODES)[number];

/** Allowed values for governance.timing.reason_code (includes consent revocation per timing rules). */
export const GOVERNANCE_TIMING_REASONS = new Set<string>([
  TIMING_OK,
  TIMING_PASSIVE,
  TIMING_EXPIRED,
  TIMING_COOLDOWN,
  CONSENT_REVOKED,
]);

/** Allowed in channels.*.block_reasons only (not timing, not mandate outcomes). */
export const CHANNEL_BLOCK_REASON_CODES = new Set<string>([
  CONSENT_REVOKED,
  CONSENT_MISSING,
  CONSENT_EXPIRED,
  CHANNEL_POLICY_BLOCK,
  CHANNEL_NO_AVAILABLE,
  INTENT_REVOKED,
  INTENT_UNKNOWN,
]);

export const GOVERNANCE_CHANNEL_KEYS = ["email", "whatsapp", "linkedin", "phone"] as const;
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

function isIntentTimingSignal(s: string): s is IntentTimingSignal {
  return s === "active_now" || s === "exploring" || s === "passive" || s === "unknown";
}

function isIntentConsentState(s: string): s is IntentConsentState {
  return s === "granted" || s === "limited" || s === "revoked" || s === "unknown";
}

const ALL_CODES_SET = new Set<string>(ALL_GOVERNANCE_REASON_CODES as readonly string[]);

export function assertGovernanceReasonCode(code: string): asserts code is GovernanceReasonCode {
  if (!ALL_CODES_SET.has(code)) {
    throw new Error(`${GOVERNANCE_INVALID}:invalid_reason_code:${code}`);
  }
}

/** Throws Error with message starting GOVERNANCE_INVALID if contract violated. */
export function validateGovernanceV1(gov: unknown): asserts gov is GovernanceV1 {
  if (!gov || typeof gov !== "object") {
    throw new Error(`${GOVERNANCE_INVALID}:not_object`);
  }
  const g = gov as Record<string, unknown>;
  if (g.version !== "governance_v1") throw new Error(`${GOVERNANCE_INVALID}:version`);
  if (typeof g.tenant_id !== "string" || !g.tenant_id.trim()) {
    throw new Error(`${GOVERNANCE_INVALID}:tenant_id`);
  }
  if (!("actor_id" in g)) throw new Error(`${GOVERNANCE_INVALID}:actor_id`);
  if (g.actor_id !== null && typeof g.actor_id !== "string") {
    throw new Error(`${GOVERNANCE_INVALID}:actor_id_type`);
  }
  if (typeof g.candidate_id !== "string" || !g.candidate_id.trim()) {
    throw new Error(`${GOVERNANCE_INVALID}:candidate_id`);
  }

  const cs = g.context_state;
  if (!cs || typeof cs !== "object") throw new Error(`${GOVERNANCE_INVALID}:context_state`);
  const cso = cs as Record<string, unknown>;
  const phases: GovernancePhase[] = ["SOURCING", "INTAKE", "ACTIVE_PROCESS", "ON_HOLD", "IDLE"];
  if (!phases.includes(cso.phase as GovernancePhase)) throw new Error(`${GOVERNANCE_INVALID}:phase`);
  if (typeof cso.active_conversation !== "boolean") throw new Error(`${GOVERNANCE_INVALID}:active_conversation`);
  if (cso.intake_status !== null && typeof cso.intake_status !== "string") {
    throw new Error(`${GOVERNANCE_INVALID}:intake_status`);
  }

  const intent = g.intent;
  if (!intent || typeof intent !== "object") throw new Error(`${GOVERNANCE_INVALID}:intent`);
  const io = intent as Record<string, unknown>;
  const ts = String(io.timing_signal ?? "");
  if (!isIntentTimingSignal(ts)) throw new Error(`${GOVERNANCE_INVALID}:timing_signal`);
  const cst = String(io.consent_state ?? "");
  if (!isIntentConsentState(cst)) throw new Error(`${GOVERNANCE_INVALID}:consent_state`);
  if (io.intent_state_expires_at !== null && typeof io.intent_state_expires_at !== "string") {
    throw new Error(`${GOVERNANCE_INVALID}:intent_state_expires_at`);
  }

  const timing = g.timing;
  if (!timing || typeof timing !== "object") throw new Error(`${GOVERNANCE_INVALID}:timing`);
  const to = timing as Record<string, unknown>;
  if (typeof to.suitable !== "boolean") throw new Error(`${GOVERNANCE_INVALID}:timing_suitable`);
  const trc = String(to.reason_code ?? "");
  if (!GOVERNANCE_TIMING_REASONS.has(trc)) throw new Error(`${GOVERNANCE_INVALID}:timing_reason_code`);

  const ch = g.channels;
  if (!ch || typeof ch !== "object") throw new Error(`${GOVERNANCE_INVALID}:channels`);
  for (const key of GOVERNANCE_CHANNEL_KEYS) {
    const row = (ch as Record<string, unknown>)[key];
    if (!row || typeof row !== "object") throw new Error(`${GOVERNANCE_INVALID}:channel_${key}`);
    const r = row as Record<string, unknown>;
    if (typeof r.policy_allowed !== "boolean") throw new Error(`${GOVERNANCE_INVALID}:channel_${key}_policy`);
    if (typeof r.consent_effective !== "boolean") {
      throw new Error(`${GOVERNANCE_INVALID}:channel_${key}_consent`);
    }
    if (!Array.isArray(r.block_reasons)) throw new Error(`${GOVERNANCE_INVALID}:channel_${key}_blocks`);
    const blocked = r.policy_allowed !== true || r.consent_effective !== true;
    if (blocked && r.block_reasons.length === 0) {
      throw new Error(`${GOVERNANCE_INVALID}:channel_${key}_block_reasons_empty`);
    }
    if (!blocked && r.block_reasons.length !== 0) {
      throw new Error(`${GOVERNANCE_INVALID}:channel_${key}_block_reasons_must_be_empty`);
    }
    for (const br of r.block_reasons as unknown[]) {
      if (typeof br !== "string" || !CHANNEL_BLOCK_REASON_CODES.has(br)) {
        throw new Error(`${GOVERNANCE_INVALID}:channel_${key}_invalid_block_code`);
      }
    }
  }
}

export function deepFreezeGovernance<T extends object>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const v = (obj as Record<string, unknown>)[prop];
    if (v !== null && typeof v === "object") deepFreezeGovernance(v as object);
  });
  return Object.freeze(obj);
}
