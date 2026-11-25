import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";
import { mountAvatar, type AvatarHandle, type AvatarOptions } from "./core/index.js";

export * from "./core/index.js";

export type AvatarProps = AvatarOptions &
  Omit<HTMLAttributes<HTMLSpanElement>, "color"> & { className?: string; style?: CSSProperties };

export function Avatar({ shape, color, state, look, size, seed, label, ...rest }: AvatarProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const handle = useRef<AvatarHandle | null>(null);
  const options: AvatarOptions = { shape, color, state, look, size, seed, label };

  useEffect(() => {
    handle.current = mountAvatar(ref.current!, options);
    return () => {
      handle.current?.destroy();
      handle.current = null;
    };
  }, []);

  // Every render: a changed className from React wipes the avatar's classes, and update puts them back.
  useEffect(() => {
    handle.current?.update(options);
  });

  return <span ref={ref} {...rest} />;
}
