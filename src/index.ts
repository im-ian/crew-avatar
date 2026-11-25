import { mountAvatar, type AvatarHandle, type AvatarOptions } from "./core/index.js";

export * from "./core/index.js";

const ATTRS = ["shape", "color", "state", "look", "size", "seed", "label"] as const;

/**
 * `<crew-avatar shape="crown" color="#4da3ff" state="working" size="64"></crew-avatar>`
 * Light DOM, so the stylesheet and your CSS variables reach it.
 */
// Lets server-side code import this entry; the element only registers in a browser.
const Base = (typeof HTMLElement === "undefined" ? class {} : HTMLElement) as typeof HTMLElement;

export class Avatar extends Base {
  static observedAttributes = [...ATTRS];
  #handle: AvatarHandle | null = null;

  #options(): AvatarOptions {
    const o: Record<string, string | null> = {};
    for (const a of ATTRS) o[a] = this.getAttribute(a);
    const size = o.size && /^\d+(\.\d+)?$/.test(o.size) ? Number(o.size) : o.size;
    return { ...o, size } as AvatarOptions;
  }

  connectedCallback() {
    this.#handle = mountAvatar(this, this.#options());
  }

  disconnectedCallback() {
    this.#handle?.destroy();
    this.#handle = null;
  }

  attributeChangedCallback() {
    this.#handle?.update(this.#options());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("crew-avatar")) {
  customElements.define("crew-avatar", Avatar);
}

declare global {
  interface HTMLElementTagNameMap {
    "crew-avatar": Avatar;
  }
}
