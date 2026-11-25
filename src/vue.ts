import { defineComponent, h, onBeforeUnmount, onMounted, onUpdated, ref, watch, type PropType } from "vue";
import { mountAvatar, type AvatarHandle, type AvatarOptions, type AvatarState, type WorkLook } from "./core/index.js";

export * from "./core/index.js";

/** `<Avatar shape="crown" state="working" :size="64" />` */
export const Avatar = defineComponent({
  name: "Avatar",
  props: {
    shape: String,
    color: String,
    state: String as PropType<AvatarState>,
    look: String as PropType<WorkLook>,
    size: [Number, String],
    seed: String,
    label: String,
  },
  setup(props) {
    const el = ref<HTMLSpanElement>();
    let handle: AvatarHandle | null = null;
    const options = (): AvatarOptions => ({ ...props });

    onMounted(() => {
      handle = mountAvatar(el.value!, options());
    });
    watch(props, () => handle?.update(options()));
    // A parent changing the fallthrough class rewrites className; update restores the avatar's classes.
    onUpdated(() => handle?.update(options()));
    onBeforeUnmount(() => {
      handle?.destroy();
      handle = null;
    });
    return () => h("span", { ref: el });
  },
});

export default Avatar;
