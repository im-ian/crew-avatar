import { computed, createApp, ref } from "vue";
import { Avatar, STATES } from "@crew-avatar/vue";

createApp({
  components: { Avatar },
  setup() {
    const n = ref(0);
    const state = computed(() => STATES[n.value % STATES.length]);
    return { n, state, STATES, shown: ["circle", "crown", "full-moon"] };
  },
  template: `
    <main>
      <h1>@crew-avatar/vue</h1>
      <div class="hero">
        <Avatar shape="cup" :state="state" :size="96" seed="hero" :label="'cup, ' + state" />
        <button @click="n++">Next state ({{ state }})</button>
      </div>
      <div v-for="shape in shown" :key="shape" class="row">
        <figure v-for="s in STATES" :key="s">
          <Avatar :shape="shape" :state="s" :size="56" :seed="shape + s" />
          <figcaption>{{ s }}</figcaption>
        </figure>
      </div>
    </main>`,
}).mount("#root");
