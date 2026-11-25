import { Component, ElementRef, Input, ViewEncapsulation, inject, type OnChanges, type OnDestroy, type OnInit } from "@angular/core";
import { mountAvatar, type AvatarHandle, type AvatarOptions, type AvatarState, type WorkLook } from "@crew-avatar/core";

/** `<crew-avatar shape="crown" state="working" [size]="64" />` */
@Component({
  selector: "crew-avatar",
  standalone: true,
  template: "",
  encapsulation: ViewEncapsulation.None,
})
export class CrewAvatarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() shape?: string | null;
  @Input() color?: string | null;
  @Input() state?: AvatarState | null;
  @Input() look?: WorkLook | null;
  @Input() size?: number | string | null;
  @Input() seed?: string | null;
  @Input() label?: string | null;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private handle: AvatarHandle | null = null;

  private get options(): AvatarOptions {
    const { shape, color, state, look, size, seed, label } = this;
    return { shape, color, state, look, size, seed, label };
  }

  ngOnInit(): void {
    this.handle = mountAvatar(this.host.nativeElement, this.options);
  }

  ngOnChanges(): void {
    this.handle?.update(this.options);
  }

  ngOnDestroy(): void {
    this.handle?.destroy();
    this.handle = null;
  }
}
