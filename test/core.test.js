import test from "node:test";
import assert from "node:assert/strict";
import {
  SHAPE_NAMES,
  SHAPES,
  STATES,
  WORK_LOOKS,
  normalizeHex,
  pickWorkLook,
  renderAvatarHTML,
  resolveFace,
  seededFace,
} from "../dist/core/index.js";

test("92 shapes, each with complete geometry", () => {
  assert.equal(SHAPE_NAMES.length, 92);
  for (const name of SHAPE_NAMES) {
    const s = SHAPES[name];
    assert.match(s.markup, /currentColor/, name);
    for (const k of ["x", "y", "w", "h"]) assert.equal(typeof s.box[k], "number", `${name}.box.${k}`);
    assert.ok(s.ink > 0.8 && s.ink <= 1.01, `${name}.ink`);
    assert.ok(s.eyes.x > 0 && s.eyes.x < 64 && s.eyes.y > 0 && s.eyes.y < 64, `${name}.eyes`);
  }
});

test("colors: only hex reaches the markup", () => {
  assert.equal(normalizeHex("#ABC"), "#aabbcc");
  assert.equal(normalizeHex("4da3ff"), "#4da3ff");
  assert.equal(normalizeHex('red" onload="x'), null);
  assert.equal(normalizeHex("rgb(0,0,0)"), null);
  assert.equal(resolveFace("x", "nope", "nope").shape, seededFace("x").shape);
  // Parchment brings its own color unless one is given.
  assert.equal(resolveFace("x", "parchment", null).color, SHAPES.parchment.color);
  assert.equal(resolveFace("x", "parchment", "#4da3ff").color, "#4da3ff");
});

test("seeded faces are stable", () => {
  assert.deepEqual(seededFace("ada"), seededFace("ada"));
});

test("a work look never repeats back to back", () => {
  let prev = null;
  for (let i = 0; i < 200; i++) {
    const next = pickWorkLook(prev);
    assert.ok(WORK_LOOKS.includes(next));
    assert.notEqual(next, prev);
    prev = next;
  }
  assert.equal(pickWorkLook("hustle", () => 0.999), "keyboard");
});

test("render covers every state and shape", () => {
  for (const state of STATES) {
    for (const shape of SHAPE_NAMES) {
      const html = renderAvatarHTML({ shape, color: "#4da3ff", state, look: "laptop", label: null });
      assert.match(html, new RegExp(`class="crew-avatar-face is-${state}`));
      assert.equal(html.includes("crew-work-laptop"), state === "working");
      assert.equal(html.includes("crew-orbit-clip"), state === "working" || state === "blocked");
    }
  }
  assert.match(renderAvatarHTML({ shape: "circle", color: "#fff", state: "question", look: null }), /crew-avatar-mark/);
  assert.match(renderAvatarHTML({ shape: "circle", color: "#fff", state: "exited", look: null }), /crew-avatar-zzz/);
});

test("labels are escaped", () => {
  const html = renderAvatarHTML({ shape: "circle", color: "#fff", state: "idle", look: null, label: "<b>&\"" });
  assert.match(html, /<title>&#60;b&#62;&#38;&#34;<\/title>/);
  assert.match(html, /role="img"/);
});
