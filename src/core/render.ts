import { SHAPES, SWATCHES } from "./shapes.js";
import type { AvatarState, ShapeDef, WorkLook } from "./types.js";

export type ShapeName = keyof typeof SHAPES;
export const SHAPE_NAMES = Object.keys(SHAPES) as ShapeName[];
export const STATES: readonly AvatarState[] = ["idle", "working", "blocked", "exited", "happy", "success", "failure", "question"];
export const WORK_LOOKS: readonly WorkLook[] = ["hustle", "magnifier", "laptop", "checklist", "keyboard"];

function hash(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function isShape(s: unknown): s is ShapeName {
  return typeof s === "string" && Object.prototype.hasOwnProperty.call(SHAPES, s);
}

/** #rgb or #rrggbb, lower-cased with the hash. Anything else is null, so only hex ever reaches the markup. */
export function normalizeHex(input: string | null | undefined): string | null {
  const hex = String(input ?? "").trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(hex)) return ("#" + hex.replace(/./g, "$&$&")).toLowerCase();
  if (/^[0-9a-f]{6}$/i.test(hex)) return ("#" + hex).toLowerCase();
  return null;
}

/** The face a seed gets when no shape or color is given. Same seed, same face. */
export function seededFace(seed: string): { shape: ShapeName; color: string } {
  const h = hash(seed);
  // Only the first 11 shapes and 10 colors, so faces stay stable if the lists grow.
  return { shape: SHAPE_NAMES[h % 11], color: SWATCHES[Math.floor(h / 11) % 10] };
}

export function resolveFace(seed?: string | null, shape?: string | null, color?: string | null) {
  const fallback = seededFace(String(seed || "agent"));
  return { shape: isShape(shape) ? shape : fallback.shape, color: normalizeHex(color) || fallback.color };
}

/** Seconds (0–8.2) that desync faces with different seeds. */
export function phaseOf(seed?: string | null): number {
  return (hash(String(seed || "")) % 83) / 10;
}

/** Any look but the previous one, so back-to-back runs never look the same. */
export function pickWorkLook(prev: WorkLook | null = null, rand: () => number = Math.random): WorkLook {
  const pool = prev ? WORK_LOOKS.filter((l) => l !== prev) : WORK_LOOKS;
  return pool[Math.min(pool.length - 1, Math.floor(rand() * pool.length))];
}

function fit(b: ShapeDef["box"], ink = 1): string {
  const s = (60 / Math.max(b.w, b.h)) * (b.optical ?? 1) * ink;
  const cx = b.x + b.w / 2 + (b.opticalX ?? 0);
  const cy = b.y + b.h / 2 + (b.opticalY ?? 0);
  return `translate(32 32) scale(${s}) translate(${-cx} ${-cy})`;
}

function eye(x: number, y: number, dir: number): string {
  const ax = x + dir * 1.6;
  return (
    `<g class="crew-avatar-eye"><rect class="crew-avatar-pill" x="${x - 3}" y="${y - 5.25}" width="6" height="10.5" rx="3"/>` +
    `<path class="crew-avatar-arc" d="M${ax - 3} ${y + 1.8}Q${ax} ${y - 3.8} ${ax + 3} ${y + 1.8}"/></g>`
  );
}

const HALO = "var(--crew-avatar-bg)";

function questionMark(color: string): string {
  const hook = `<path d="M-4.2 -5.2C-4.2 -9.4 4.2 -9.4 4.2 -4.8C4.2 -1.8 0 -1.6 0 2"/><path d="M0 7.6V7.7"/>`;
  return (
    `<g class="crew-avatar-mark" transform="translate(53 8) scale(1.25)"><g class="crew-avatar-mark-pop">` +
    `<g fill="none" stroke="${HALO}" stroke-width="6.4" stroke-linecap="round">${hook}</g>` +
    `<g fill="none" stroke="${color}" stroke-width="2.8" stroke-linecap="round">${hook}</g></g></g>`
  );
}

function sleepMarks(color: string): string {
  const z = `<path d="M-3.2 -3.4H3.2L-3.2 3.4H3.2"/>`;
  const one =
    `<g class="crew-avatar-z"><g fill="none" stroke="${HALO}" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round">${z}</g>` +
    `<g fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${z}</g></g>`;
  return `<g class="crew-avatar-zzz" transform="translate(51 12)">${one}${one}</g>`;
}

function orbit(state: AvatarState, half: "back" | "front"): string {
  if (state !== "working" && state !== "blocked") return "";
  const extra = state === "working" ? "<i><b></b></i>" : "<u></u>";
  return `<span class="crew-orbit-clip is-${half}" aria-hidden="true"><span class="crew-avatar-orbit is-${state} is-${half}"><i><b></b></i>${extra}</span></span>`;
}

// Keys are laid out once. Each presses at its own offset so the typing looks uneven.
const KEYS = [
  { y: 3, x0: 3, n: 9 },
  { y: 8.2, x0: 4.6, n: 8 },
  { y: 13.4, x0: 6.2, n: 7 },
]
  .flatMap((row, r) =>
    Array.from({ length: row.n }, (_, i) => {
      const delay = ((((r * 7 + i * 5) % 11) / 11) * 2.2).toFixed(2);
      return `<rect class="crew-work-key" x="${row.x0 + i * 5.1}" y="${row.y}" width="4" height="3.6" rx="1" style="animation-delay:${delay}s"/>`;
    }),
  )
  .join("");

const PROPS: Record<WorkLook, string> = {
  hustle: `<span class="crew-work-lines"><i></i><i></i><i></i></span>`,
  magnifier:
    `<span class="crew-work-mag"><svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.4" fill="rgba(255,255,255,0.16)" stroke="var(--crew-avatar-ink)" stroke-width="2.2"/>` +
    `<path d="M14.8 14.8L21 21" stroke="var(--crew-avatar-ink)" stroke-width="3.4" stroke-linecap="round"/>` +
    `<path class="crew-work-glint" d="M7 8.2A4 4 0 0 1 9.4 6.4" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg></span>`,
  laptop:
    `<span class="crew-work-laptop"><svg viewBox="0 0 40 26"><rect x="3" y="1" width="34" height="20" rx="3" fill="var(--crew-avatar-btn-hover)" stroke="var(--crew-avatar-line)"/>` +
    `<circle cx="20" cy="11" r="2.6" fill="var(--crew-avatar-muted)" opacity="0.7"/>` +
    `<rect x="0.5" y="21.6" width="39" height="3.4" rx="1.7" fill="var(--crew-avatar-btn)" stroke="var(--crew-avatar-line)"/></svg></span>`,
  checklist:
    `<span class="crew-work-list">` +
    [0, 1, 2]
      .map(
        (n) =>
          `<b class="crew-work-row crew-work-r${n}"><svg viewBox="0 0 10 10"><rect x="0.8" y="0.8" width="8.4" height="8.4" rx="2" fill="none" stroke="#9a9aa2" stroke-width="1.2"/>` +
          `<path class="crew-work-tick" d="M2.4 5.2L4.4 7.1L7.8 2.9" fill="none" stroke="var(--crew-avatar-idle)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><i></i></b>`,
      )
      .join("") +
    `</span>`,
  keyboard:
    `<span class="crew-work-kb"><svg viewBox="0 0 48 21"><rect x="0.5" y="0.5" width="47" height="20" rx="3.4" fill="var(--crew-avatar-btn)" stroke="var(--crew-avatar-line)"/>` +
    `${KEYS}<rect class="crew-work-key" x="13" y="18" width="22" height="2.2" rx="1" style="animation-delay:1s"/></svg></span>`,
};

const escapeText = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Inner markup of an avatar host (an element with the `crew-avatar` class).
 * Pure: `shape`, `color` and `look` must already be resolved and valid.
 */
export function renderAvatarHTML(o: {
  shape: ShapeName;
  color: string;
  state: AvatarState;
  look: WorkLook | null;
  label?: string | null;
}): string {
  const def: ShapeDef = SHAPES[o.shape];
  const look = o.state === "working" ? o.look : null;
  const cls = `crew-avatar-face is-${o.state}${look ? ` look-${look}` : ""}`;
  const a11y = o.label ? `role="img"` : `aria-hidden="true"`;
  const dx = def.eyes.dx ?? 7.2;
  return (
    orbit(o.state, "back") +
    `<svg class="${cls}" viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" ${a11y}>` +
    (o.label ? `<title>${escapeText(o.label)}</title>` : "") +
    `<g transform="${fit(def.box, def.ink)}" color="${o.color}">${def.markup}</g>` +
    `<g transform="${fit(def.box)}"><g class="crew-avatar-gaze" fill="#fff"><g class="crew-avatar-blink">` +
    eye(def.eyes.x - dx, def.eyes.y, -1) +
    eye(def.eyes.x + dx, def.eyes.y, 1) +
    `</g></g></g>` +
    (o.state === "question" ? questionMark(o.color) : "") +
    (o.state === "exited" ? sleepMarks(o.color) : "") +
    `</svg>` +
    (look ? `<span class="crew-work-props is-${look}" aria-hidden="true">${PROPS[look]}</span>` : "") +
    orbit(o.state, "front")
  );
}
