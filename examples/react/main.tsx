import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { CrewAvatar, STATES } from "@crew-avatar/react";

const SHOWN = ["circle", "crown", "full-moon"];

function App() {
  const [n, setN] = useState(0);
  const state = STATES[n % STATES.length];
  return (
    <main>
      <h1>@crew-avatar/react</h1>
      <div className="hero">
        <CrewAvatar shape="cup" state={state} size={96} seed="hero" label={`cup, ${state}`} />
        <button onClick={() => setN(n + 1)}>Next state ({state})</button>
      </div>
      {SHOWN.map((shape) => (
        <div className="row" key={shape}>
          {STATES.map((s) => (
            <figure key={s}>
              <CrewAvatar shape={shape} state={s} size={56} seed={shape + s} />
              <figcaption>{s}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
