export type ShapeDef = {
  /** SVG drawn in a 64×64 box. Fills use currentColor, so the face color applies. */
  markup: string;
  /** The ink's bounding box and optical nudges, used to centre and size every shape alike. */
  box: { x: number; y: number; w: number; h: number; optical?: number; opticalX?: number; opticalY?: number };
  /** Measured ink coverage, so spiky and round shapes read the same size. */
  ink: number;
  /** Centre of the eye pair, and half the gap between the eyes (default 7.2). */
  eyes: { x: number; y: number; dx?: number };
  /** The color a face of this shape gets when none is given, for shapes whose look depends on it. */
  color?: string;
};

/** What a bot is doing. */
export type AvatarStatus = "idle" | "working" | "blocked" | "exited";
/** A held expression, usually shown for a moment after a run ends. */
export type AvatarMood = "happy" | "success" | "failure" | "question";
export type AvatarState = AvatarStatus | AvatarMood;

/** How a working face keeps busy. */
export type WorkLook = "hustle" | "magnifier" | "laptop" | "checklist" | "keyboard";

export type AvatarOptions = {
  /** One of SHAPE_NAMES. Unknown or missing: picked from `seed`. */
  shape?: string | null;
  /** Hex color (#rgb or #rrggbb). Anything else: the shape's own color if it has one (parchment), else picked from `seed`. */
  color?: string | null;
  /** Default "idle". */
  state?: AvatarState | null;
  /** Only used while working. Missing: a random look, never the same one twice in a row. */
  look?: WorkLook | null;
  /** Pixels, or any CSS length. Default 40px (or the --crew-avatar-size variable). */
  size?: number | string | null;
  /** Stable key (a user id, a name). Picks the default shape and color and offsets the animation phase. */
  seed?: string | null;
  /** Accessible name. Without it the avatar is hidden from screen readers. */
  label?: string | null;
};
