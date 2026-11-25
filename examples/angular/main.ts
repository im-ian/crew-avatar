import "@angular/compiler"; // JIT keeps this demo a single esbuild step; real apps use the Angular CLI.
import { Component, signal } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { Avatar, STATES } from "crew-avatar/angular";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [Avatar],
  template: `
    <main>
      <h1>crew-avatar/angular</h1>
      <div class="hero">
        <crew-avatar shape="cup" [state]="state()" [size]="96" seed="hero" [label]="'cup, ' + state()" />
        <button (click)="n.set(n() + 1)">Next state ({{ state() }})</button>
      </div>
      @for (shape of shown; track shape) {
        <div class="row">
          @for (s of states; track s) {
            <figure>
              <crew-avatar [shape]="shape" [state]="s" [size]="56" [seed]="shape + s" />
              <figcaption>{{ s }}</figcaption>
            </figure>
          }
        </div>
      }
    </main>
  `,
})
class App {
  n = signal(0);
  states = STATES;
  shown = ["circle", "crown", "full-moon"];
  state = () => STATES[this.n() % STATES.length];
}

bootstrapApplication(App).catch((err) => console.error(err));
