import { SHAPES } from "./shapes.js";
import { STATES, WORK_LOOKS, phaseOf, pickWorkLook, renderAvatarHTML, resolveFace } from "./render.js";
import { injectStyles } from "./style.js";
import type { AvatarOptions, AvatarState, WorkLook } from "./types.js";

export type AvatarHandle = {
  /** Applies new options. Cheap when nothing changed, so it is fine to call on every render. */
  update(options: AvatarOptions): void;
  /** Stops timers and listeners. The host's markup stays for the framework to remove. */
  destroy(): void;
};

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
const between = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

// The working hoop tilts to a new random angle every few seconds.
function startOrbitRoll(host: HTMLElement): () => void {
  const set = () => {
    const calm = reducedMotion();
    host.style.setProperty("--orbit-rot", `${calm ? 0 : Math.round(between(-85, 85))}deg`);
    host.style.setProperty("--orbit-k", String(calm ? 0.42 : +between(0.2, 0.72).toFixed(2)));
    host.style.setProperty("--orbit-r", String(calm ? 0.15 : +between(0.11, 0.28).toFixed(2)));
  };
  // The first tilt lands without the 2.6s glide.
  host.style.transition = "none";
  set();
  void host.offsetWidth;
  host.style.removeProperty("transition");
  let timer = 0;
  const tick = () => {
    set();
    timer = window.setTimeout(tick, Math.round(between(2400, 4600)));
  };
  timer = window.setTimeout(tick, Math.round(between(2400, 4600)));
  return () => {
    window.clearTimeout(timer);
    for (const p of ["--orbit-rot", "--orbit-k", "--orbit-r"]) host.style.removeProperty(p);
  };
}

const GAZE_RETURN_MS = 320; // matches .is-gaze-return in the stylesheet

/**
 * Draws an avatar into `host` and keeps it alive: eyes follow the pointer over
 * the face and ease home when it leaves, and a working hoop keeps re-tilting.
 * Classes and styles already on the host are left alone.
 */
export function mountAvatar(host: HTMLElement, options: AvatarOptions = {}): AvatarHandle {
  if (typeof window === "undefined") return { update() {}, destroy() {} };
  injectStyles(host.ownerDocument);

  let html = "";
  let eyes = { x: 32, y: 31 };
  let look: WorkLook | null = null;
  let lastLook: WorkLook | null = null;
  let stopOrbit: (() => void) | null = null;
  let gaze: { x: number; y: number } | null = null;
  let settled = false;
  let cancelReturn = () => {};

  const svg = () => host.querySelector<SVGSVGElement>("svg.crew-avatar-face");

  function apply(g: { x: number; y: number } | null, returning: boolean) {
    const el = svg();
    if (!el) return;
    el.classList.toggle("is-tracking", !!g && !returning);
    el.classList.toggle("is-gaze-return", returning);
    el.classList.toggle("is-gaze-settled", settled);
    // Tracking stays transitionless so the eyes land on the same frame as the cursor.
    if (returning) el.style.removeProperty("transition");
    else el.style.transition = "none";
    if (g) {
      el.style.setProperty("--gaze-x", `${g.x}px`);
      el.style.setProperty("--gaze-y", `${g.y}px`);
    } else {
      el.style.removeProperty("--gaze-x");
      el.style.removeProperty("--gaze-y");
    }
  }

  function settle() {
    cancelReturn();
    gaze = null;
    settled = true;
    apply(null, false);
  }

  function onMove(e: PointerEvent) {
    const el = svg();
    if (!el || reducedMotion()) return;
    cancelReturn();
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 64;
    const y = ((e.clientY - r.top) / Math.max(r.height, 1)) * 64;
    const clamp = (n: number) => Math.max(-1, Math.min(1, n));
    gaze = { x: clamp((x - eyes.x) / 28) * 4.6, y: clamp((y - eyes.y) / 20) * 3.2 };
    apply(gaze, false);
  }

  function onLeave() {
    const el = svg();
    if (!gaze || !el) return;
    if (reducedMotion() || (Math.abs(gaze.x) < 0.05 && Math.abs(gaze.y) < 0.05)) return settle();
    // Paint the offset with the return transition armed, then move the target home.
    let raf2 = 0;
    let timer = 0;
    const onEnd = (ev: TransitionEvent) => {
      if (ev.target === el && (ev.propertyName === "--gaze-x" || ev.propertyName === "--gaze-y")) settle();
    };
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        gaze = { x: 0, y: 0 };
        apply(gaze, true);
        el.addEventListener("transitionend", onEnd);
        timer = window.setTimeout(settle, GAZE_RETURN_MS + 160);
      });
    });
    cancelReturn = () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timer);
      el.removeEventListener("transitionend", onEnd);
      cancelReturn = () => {};
    };
  }

  function update(next: AvatarOptions) {
    const face = resolveFace(next.seed, next.shape, next.color);
    const state: AvatarState = STATES.includes(next.state as AvatarState) ? (next.state as AvatarState) : "idle";
    if (state === "working") {
      const asked = WORK_LOOKS.includes(next.look as WorkLook) ? (next.look as WorkLook) : null;
      // One look per run: drawn when work starts and kept until it stops.
      look = asked ?? look ?? pickWorkLook(lastLook);
      lastLook = look;
    } else {
      look = null;
    }

    host.classList.add("crew-avatar");
    host.classList.toggle("is-working", state === "working");
    host.classList.toggle("is-blocked", state === "blocked");
    host.style.setProperty("--crew-avatar-phase", String(phaseOf(next.seed)));
    const size = next.size;
    if (size == null || size === "") host.style.removeProperty("--crew-avatar-size");
    else host.style.setProperty("--crew-avatar-size", typeof size === "number" ? `${size}px` : size);

    const nextHtml = renderAvatarHTML({ shape: face.shape, color: face.color, state, look, label: next.label });
    if (nextHtml !== html) {
      cancelReturn();
      gaze = null;
      html = nextHtml;
      host.innerHTML = html;
      eyes = SHAPES[face.shape].eyes;
    }

    if (state === "working" && !stopOrbit) stopOrbit = startOrbitRoll(host);
    if (state !== "working" && stopOrbit) {
      stopOrbit();
      stopOrbit = null;
    }
  }

  host.addEventListener("pointerenter", onMove);
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  update(options);

  return {
    update,
    destroy() {
      cancelReturn();
      stopOrbit?.();
      stopOrbit = null;
      host.removeEventListener("pointerenter", onMove);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    },
  };
}
