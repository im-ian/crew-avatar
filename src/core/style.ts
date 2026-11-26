// The whole stylesheet. mountAvatar injects it once; it also ships as dist/crew-avatar.css.
export const CSS = `
:where(:root){--crew-avatar-bg:#19191b;--crew-avatar-ink:#f0f0f2;--crew-avatar-muted:#8e8e93;--crew-avatar-line:#2a2a2d;--crew-avatar-btn:#3a3a3c;--crew-avatar-btn-hover:#48484a;--crew-avatar-idle:#30d158;--crew-avatar-working:#0a84ff;--crew-avatar-blocked:#ff453a}
@media(prefers-color-scheme:light){:where(:root){--crew-avatar-bg:#fff;--crew-avatar-ink:#1d1d1f;--crew-avatar-muted:#636366;--crew-avatar-line:#e5e5e5;--crew-avatar-btn-hover:#2c2c2e;--crew-avatar-idle:#248a3d;--crew-avatar-working:#0071e3;--crew-avatar-blocked:#d70015}}
:where([data-crew-avatar-theme=dark]){--crew-avatar-bg:#19191b;--crew-avatar-ink:#f0f0f2;--crew-avatar-muted:#8e8e93;--crew-avatar-line:#2a2a2d;--crew-avatar-btn-hover:#48484a;--crew-avatar-idle:#30d158;--crew-avatar-working:#0a84ff;--crew-avatar-blocked:#ff453a}
:where([data-crew-avatar-theme=light]){--crew-avatar-bg:#fff;--crew-avatar-ink:#1d1d1f;--crew-avatar-muted:#636366;--crew-avatar-line:#e5e5e5;--crew-avatar-btn-hover:#2c2c2e;--crew-avatar-idle:#248a3d;--crew-avatar-working:#0071e3;--crew-avatar-blocked:#d70015}
.crew-avatar{width:var(--crew-avatar-size,40px);height:var(--crew-avatar-size,40px);display:inline-grid;place-items:center;vertical-align:middle;position:relative;overflow:visible;user-select:none;flex-shrink:0}
.crew-avatar-face{width:100%;height:100%;display:block;overflow:visible;position:relative;z-index:1}
.crew-avatar-face .crew-avatar-gaze,.crew-avatar-face .crew-avatar-blink,.crew-avatar-face .crew-avatar-eye,.crew-avatar-face .crew-avatar-pill,.crew-avatar-face .crew-avatar-arc{transform-box:fill-box;transform-origin:center}
.crew-avatar-pill,.crew-avatar-arc{transition:transform .28s cubic-bezier(.34,1.4,.64,1),opacity .2s ease}
.crew-avatar-arc{fill:none;stroke:#fff;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;opacity:0;transform:scaleY(.35)}
.crew-avatar-face.is-blocked .crew-avatar-pill{transform:scaleY(.2);opacity:0}
.crew-avatar-face.is-blocked .crew-avatar-arc{transform:scaleY(-1);opacity:1}
.crew-avatar-face.is-exited{transform-origin:50% 88%;animation:crew-avatar-snooze 4.6s ease-in-out infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -.6s);opacity:.88}
.crew-avatar-face.is-exited .crew-avatar-pill{transform:scaleY(.14);opacity:0}
.crew-avatar-face.is-exited .crew-avatar-arc{transform:scaleY(-.5);opacity:.92}
.crew-avatar-face.is-exited .crew-avatar-gaze{transform:translateY(1.6px)}
.crew-avatar-zzz{pointer-events:none}
.crew-avatar-zzz .crew-avatar-z{transform-box:fill-box;transform-origin:50% 100%;opacity:0;animation:crew-avatar-z-rise 3.6s ease-in infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -.4s)}
.crew-avatar-zzz .crew-avatar-z+.crew-avatar-z{animation-delay:calc(var(--crew-avatar-phase, 0) * -.4s - 1.8s)}
.crew-avatar-face.is-happy .crew-avatar-pill,.crew-avatar-face.is-success .crew-avatar-pill{transform:scaleY(.14);opacity:0}
.crew-avatar-face.is-happy .crew-avatar-arc,.crew-avatar-face.is-success .crew-avatar-arc{transform:scaleY(1);opacity:1}
.crew-avatar-face.is-success,.crew-avatar-face.is-failure,.crew-avatar-face.is-question{transform-origin:50% 88%}
.crew-avatar-face.is-success{animation:crew-avatar-cheer 1.3s ease-in-out;animation-iteration-count:var(--crew-avatar-mood-count, infinite)}
.crew-avatar-face.is-success .crew-avatar-gaze{transform:translateY(-1.2px)}
.crew-avatar-face.is-failure{animation:crew-avatar-droop .9s cubic-bezier(.3,0,.2,1) forwards,crew-avatar-sulk 3.6s ease-in-out .9s infinite;filter:saturate(.78) brightness(.93)}
.crew-avatar-face.is-failure .crew-avatar-pill{transform:scale(1.5,.2);opacity:.95}
.crew-avatar-face.is-failure .crew-avatar-gaze{transform:translateY(2.4px)}
.crew-avatar-face.is-question{animation:crew-avatar-wonder 2.8s cubic-bezier(.3,0,.2,1);animation-iteration-count:var(--crew-avatar-mood-count, infinite)}
.crew-avatar-face.is-question .crew-avatar-gaze{transform:translate(3.4px,-2.6px)}
.crew-avatar-face.is-question .crew-avatar-blink{animation:crew-avatar-blink 5.6s ease-in-out infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -1.3s)}
.crew-avatar-mark{pointer-events:none}
.crew-avatar-mark-pop{transform-box:fill-box;transform-origin:50% 100%;animation:crew-avatar-mark-pop .5s cubic-bezier(.34,1.56,.64,1) both,crew-avatar-mark-bob 1.4s ease-in-out .5s infinite}
.crew-avatar-face.is-idle .crew-avatar-gaze,.crew-avatar-face.is-happy .crew-avatar-gaze,.crew-avatar-face.is-working .crew-avatar-gaze{animation:crew-avatar-gaze 7.2s ease-in-out infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -1s)}
.crew-avatar-face.is-working .crew-avatar-gaze{animation-name:crew-avatar-ponder;animation-duration:8.4s}
@property --gaze-x{syntax: "<length>"; inherits: true; initial-value: 0px;}
@property --gaze-y{syntax: "<length>"; inherits: true; initial-value: 0px;}
.crew-avatar-face.is-tracking .crew-avatar-gaze{animation:none;transition:none;transform:translate(var(--gaze-x, 0px),var(--gaze-y, 0px))}
.crew-avatar-face.is-gaze-return{transition:--gaze-x .32s cubic-bezier(.22,1,.36,1),--gaze-y .32s cubic-bezier(.22,1,.36,1)}
.crew-avatar-face.is-gaze-return .crew-avatar-gaze{animation:none;transform:translate(var(--gaze-x, 0px),var(--gaze-y, 0px))}
.crew-avatar-face.is-gaze-settled.is-idle .crew-avatar-gaze,.crew-avatar-face.is-gaze-settled.is-happy .crew-avatar-gaze,.crew-avatar-face.is-gaze-settled.is-working .crew-avatar-gaze{animation-delay:0s}
.crew-avatar-face.is-idle .crew-avatar-blink,.crew-avatar-face.is-working .crew-avatar-blink,.crew-avatar-face.is-blocked .crew-avatar-blink{animation:crew-avatar-blink 5.6s ease-in-out infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -1.3s)}
.crew-avatar-face.is-working{animation:crew-avatar-bob 1.7s ease-in-out infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -1s)}
.crew-avatar-face.is-blocked{animation:crew-avatar-shake .7s ease-in-out infinite}
.crew-avatar-face.is-blocked .crew-avatar-eye:first-child{animation:crew-avatar-worry-l 1.8s ease-in-out infinite}
.crew-avatar-face.is-blocked .crew-avatar-eye:last-child{animation:crew-avatar-worry-r 1.8s ease-in-out infinite}
@media(prefers-reduced-motion:reduce){.crew-avatar-face.is-idle,.crew-avatar-face.is-working,.crew-avatar-face.is-blocked,.crew-avatar-face.is-idle .crew-avatar-gaze,.crew-avatar-face.is-working .crew-avatar-gaze,.crew-avatar-face.is-idle .crew-avatar-blink,.crew-avatar-face.is-working .crew-avatar-blink,.crew-avatar-face.is-blocked .crew-avatar-blink,.crew-avatar-face.is-blocked .crew-avatar-eye:first-child,.crew-avatar-face.is-blocked .crew-avatar-eye:last-child,.crew-avatar-face.is-happy .crew-avatar-gaze,.crew-avatar-face.is-success,.crew-avatar-face.is-failure,.crew-avatar-face.is-question,.crew-avatar-face.is-question .crew-avatar-blink,.crew-avatar-face.is-exited,.crew-avatar-zzz .crew-avatar-z,.crew-avatar-mark-pop,.crew-avatar-face.is-tracking .crew-avatar-gaze,.crew-avatar-face.is-gaze-return,.crew-avatar-face.is-gaze-return .crew-avatar-gaze,.crew-avatar-pill,.crew-avatar-arc{animation:none;transition:none}}
.crew-cel-dark{opacity:.16;animation:crew-cel-dark 6s ease-in-out infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -.7s)}
.crew-avatar-face.is-working.look-hustle{animation:crew-avatar-trot .46s ease-in-out infinite alternate;transform-origin:50% 88%}
.crew-avatar-face.is-working.look-hustle:not(.is-tracking):not(.is-gaze-return) .crew-avatar-gaze{animation:none;transform:translate(2px,.4px)}
.crew-avatar-face.is-working.look-hustle .crew-avatar-pill{transform:scaleY(.82)}
.crew-avatar-face.is-working.look-magnifier:not(.is-tracking):not(.is-gaze-return) .crew-avatar-gaze{animation:crew-avatar-follow 3.6s ease-in-out infinite}
.crew-avatar-face.is-working.look-laptop{animation:crew-avatar-tap .62s steps(1,end) infinite;transform-origin:50% 88%}
.crew-avatar-face.is-working.look-laptop:not(.is-tracking):not(.is-gaze-return) .crew-avatar-gaze{animation:none;transform:translateY(-.6px)}
.crew-avatar-face.is-working.look-checklist:not(.is-tracking):not(.is-gaze-return) .crew-avatar-gaze{animation:crew-avatar-skim 4.6s ease-in-out infinite}
.crew-avatar-face.is-working.look-keyboard{animation:crew-avatar-tap .95s steps(1,end) infinite;transform-origin:50% 88%}
.crew-avatar-face.is-working.look-keyboard:not(.is-tracking):not(.is-gaze-return) .crew-avatar-gaze{animation:none;transform:translateY(2.8px)}
.crew-work-props{position:absolute;inset:0;z-index:4;pointer-events:none;container-type:inline-size}
@container (max-width: 27px){.crew-work-props>*{display:none!important}}
.crew-work-props>*{position:absolute}
.crew-work-lines{top:28%;right:100%;width:30%;height:44%;margin-right:2%}
.crew-work-lines i{position:absolute;right:0;height:max(1px,3cqw);border-radius:2px;background:var(--crew-avatar-muted);transform-origin:100% 50%;animation:crew-avatar-line .7s ease-out infinite}
.crew-work-lines i:nth-child(1){top:8%;width:100%}
.crew-work-lines i:nth-child(2){top:46%;width:72%;animation-delay:.23s}
.crew-work-lines i:nth-child(3){top:84%;width:88%;animation-delay:.46s}
.crew-work-mag{left:58%;top:40%;width:46%;aspect-ratio:1;animation:crew-avatar-search 3.6s ease-in-out infinite}
.crew-work-mag svg{display:block;width:100%;height:100%;overflow:visible}
.crew-work-glint{animation:crew-avatar-glint 3.6s ease-in-out infinite}
.crew-work-laptop{left:4%;width:86%;bottom:-25%;animation:crew-avatar-keys .5s steps(1,end) infinite}
.crew-work-laptop svg{display:block;width:100%;overflow:visible}
.crew-work-list{left:79%;top:25%;width:52%;display:grid;gap:16%;padding:7% 7% 8%;border-radius:9%;background:#f4f4f6;box-shadow:0 1px 4px #00000059;transform:rotate(5deg)}
.crew-work-row{display:flex;align-items:center;gap:12%}
.crew-work-row svg{width:26%;flex-shrink:0;overflow:visible}
.crew-work-row i{flex:1;height:max(1px,2.5cqw);border-radius:2px;background:#c5c5cc}
.crew-work-tick{stroke-dasharray:12;stroke-dashoffset:12;animation:crew-avatar-tick 4.6s ease-out infinite}
.crew-work-r1 .crew-work-tick{animation-delay:.9s}
.crew-work-r2 .crew-work-tick{animation-delay:1.8s}
@container (max-width: 40px){.crew-work-list{left:76%;top:38%;width:42%}}
.crew-work-kb{left:2%;width:96%;bottom:-15%}
.crew-work-kb svg{display:block;width:100%;overflow:visible}
.crew-work-key{fill:var(--crew-avatar-btn-hover);transform-box:fill-box;animation:crew-avatar-key 2.2s ease-in-out infinite}
@media(prefers-reduced-motion:reduce){.crew-avatar-face.is-working[class*=look-],.crew-avatar-face.is-working[class*=look-] .crew-avatar-gaze,.crew-work-lines i,.crew-work-mag,.crew-work-glint,.crew-work-laptop,.crew-work-tick,.crew-work-key{animation:none!important}}
.crew-orbit-clip{--orbit-pad: calc(var(--orbit-ref, 40px) * .3 + 10px);position:absolute;inset:calc(var(--orbit-pad) * -1);contain:paint;pointer-events:none}
.crew-orbit-clip.is-back{z-index:0}
.crew-orbit-clip.is-front{z-index:3}
.crew-avatar-orbit{position:absolute;inset:calc(var(--orbit-pad) - 6px);pointer-events:none;transform:scaleY(.42)}
.crew-avatar-orbit i{position:absolute;inset:0;animation:crew-avatar-hoop 1.9s linear infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -.2s)}
.crew-avatar-orbit b{position:absolute;left:50%;top:0;width:4.5px;height:10.7px;margin:-5.35px 0 0 -2.25px;border-radius:50%;background:var(--crew-avatar-working);box-shadow:0 0 7px color-mix(in srgb,var(--crew-avatar-working) 85%,white);animation:crew-avatar-hoop 1.9s linear infinite reverse,crew-avatar-hoop-front 1.9s linear infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -.2s)}
.crew-avatar-orbit.is-back b{width:3.2px;height:7.6px;margin:-3.8px 0 0 -1.6px;animation-name:crew-avatar-hoop,crew-avatar-hoop-back}
.crew-avatar-orbit.is-blocked i,.crew-avatar-orbit.is-blocked b{animation-duration:3.4s}
@property --orbit-rot{syntax: "<angle>"; inherits: true; initial-value: 0deg;}
@property --orbit-k{syntax: "<number>"; inherits: true; initial-value: .42;}
@property --orbit-r{syntax: "<number>"; inherits: true; initial-value: .15;}
.crew-avatar.is-working{transition:--orbit-rot 2.6s ease-in-out,--orbit-k 2.6s ease-in-out,--orbit-r 2.6s ease-in-out}
.crew-avatar-orbit.is-working{inset:calc(var(--orbit-pad) - var(--orbit-r, .15) * var(--orbit-ref, 40px));transform:rotate(var(--orbit-rot, 0deg)) scaleY(var(--orbit-k, .42))}
.crew-avatar-orbit.is-working i,.crew-avatar-orbit.is-working b{animation-duration:2.3s}
.crew-avatar-orbit.is-working b{--bead: var(--orbit-bead, 4.5px);width:var(--bead);height:calc(var(--bead) / var(--orbit-k, .42));margin:calc(var(--bead) / var(--orbit-k, .42) * -.5) 0 0 calc(var(--bead) * -.5)}
.crew-avatar-orbit.is-working.is-back b{--bead: calc(var(--orbit-bead, 4.5px) * .72)}
.crew-avatar-orbit.is-working i+i,.crew-avatar-orbit.is-working i+i b{animation-delay:calc(var(--crew-avatar-phase, 0) * -.2s - 1.15s)}
.crew-avatar-orbit.is-blocked b{background:var(--crew-avatar-blocked);box-shadow:0 0 7px color-mix(in srgb,var(--crew-avatar-blocked) 80%,white)}
.crew-avatar-orbit u{position:absolute;inset:0}
.crew-avatar-orbit.is-back u{clip-path:inset(0 0 50% 0)}
.crew-avatar-orbit.is-front u{clip-path:inset(50% 0 0 0)}
.crew-avatar-orbit u:before{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid color-mix(in srgb,var(--crew-avatar-blocked) 18%,transparent);border-top-color:var(--crew-avatar-blocked);animation:crew-avatar-hoop 3.4s linear infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -.2s)}
@media(prefers-reduced-motion:reduce){.crew-avatar-orbit i,.crew-avatar-orbit b,.crew-avatar-orbit.is-back b,.crew-avatar-orbit u:before{animation:none}.crew-orbit-clip.is-back{display:none}.crew-avatar-orbit.is-working i+i{display:none}.crew-avatar-orbit.is-front u{clip-path:none}}
@keyframes crew-avatar-blink{0%,86%,94%,to{transform:scaleY(1)}88.5%,90.5%{transform:scaleY(.1)}91.5%{transform:scaleY(1)}92.5%,93.2%{transform:scaleY(.1)}}
@keyframes crew-avatar-bob{0%,to{transform:translateY(0)}50%{transform:translateY(-6%)}}
@keyframes crew-avatar-cheer{0%{transform:translate(0) rotate(0) scale(1)}10%{transform:translateY(2%) rotate(0) scale(1.05,.93)}26%{transform:translate(-9%,-16%) rotate(-12deg) scale(.97,1.05)}40%{transform:translate(-7%,1%) rotate(-7deg) scale(1.04,.95)}52%{transform:translate(-2%,-4%) rotate(8deg)}64%{transform:translate(3%,-3%) rotate(-8deg)}76%{transform:translate(-1%,-3%) rotate(7deg)}88%{transform:translateY(-1%) rotate(-3deg)}to{transform:translate(0) rotate(0) scale(1)}}
@keyframes crew-avatar-droop{0%{transform:translate(0) rotate(0) scale(1)}55%{transform:translate(1%,11%) rotate(7deg) scale(1.02,.9)}to{transform:translate(1%,9%) rotate(5deg) scale(1.01,.93)}}
@keyframes crew-avatar-follow{0%,to{transform:translate(2.4px,1.2px)}25%{transform:translate(4px,-.6px)}50%{transform:translate(3.2px,-2.6px)}75%{transform:translate(1px,-1.2px)}}
@keyframes crew-avatar-gaze{0%,to{transform:translate(0)}30%{transform:translate(16%,8%)}58%{transform:translate(-14%,6%)}78%{transform:translate(6%,-8%)}}
@keyframes crew-avatar-glint{0%,38%,to{opacity:.2}50%{opacity:1}}
@keyframes crew-avatar-hoop{to{transform:rotate(360deg)}}
@keyframes crew-avatar-hoop-back{0%,22%{opacity:1}28%,72%{opacity:0}78%,to{opacity:1}}
@keyframes crew-avatar-hoop-front{0%,22%{opacity:0}28%,72%{opacity:1}78%,to{opacity:0}}
@keyframes crew-avatar-key{0%,38%,to{transform:translateY(0);fill:var(--crew-avatar-btn-hover)}44%{transform:translateY(.9px);fill:var(--crew-avatar-working)}58%{transform:translateY(0);fill:var(--crew-avatar-btn-hover)}}
@keyframes crew-avatar-keys{0%,to{transform:translateY(0)}20%{transform:translateY(1.5%)}45%{transform:translateY(0)}70%{transform:translateY(1%)}}
@keyframes crew-avatar-line{0%{transform:translate(40%) scaleX(.2);opacity:0}35%{opacity:.9}to{transform:translate(-30%) scaleX(1);opacity:0}}
@keyframes crew-avatar-mark-bob{0%,to{transform:translateY(0) rotate(0)}50%{transform:translateY(-5%) rotate(6deg)}}
@keyframes crew-avatar-mark-pop{0%{transform:scale(0) rotate(-20deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
@keyframes crew-avatar-ponder{0%,9%{transform:translate(0)}33%,54%{transform:translate(-30%,-12%)}78%,91%{transform:translate(22%,-8%)}to{transform:translate(0)}}
@keyframes crew-avatar-search{0%,to{transform:translate(0) rotate(-6deg)}25%{transform:translate(14%,-18%) rotate(4deg)}50%{transform:translate(-6%,-28%) rotate(10deg)}75%{transform:translate(-16%,-10%) rotate(-4deg)}}
@keyframes crew-avatar-shake{0%,to{transform:translate(0) rotate(0)}30%{transform:translate(-3%) rotate(-2.4deg)}70%{transform:translate(3%) rotate(2.4deg)}}
@keyframes crew-avatar-skim{0%,to{transform:translate(3px,-2px)}22%{transform:translate(3.4px,-.4px)}44%{transform:translate(3.4px,1.6px)}70%{transform:translate(3.4px,1.6px)}86%{transform:translate(3px,-2px)}}
@keyframes crew-avatar-snooze{0%,to{transform:translateY(6%) rotate(3deg) scaleY(.97)}50%{transform:translateY(5%) rotate(3deg) scale(1.025,1.015)}}
@keyframes crew-avatar-sulk{0%,to{transform:translate(1%,9%) rotate(5deg) scale(1.01,.93)}50%{transform:translate(1%,10.5%) rotate(6deg) scale(1.01,.91)}}
@keyframes crew-avatar-tap{0%,to{transform:translateY(0) rotate(0)}14%{transform:translateY(2.4%) rotate(-1.4deg)}30%{transform:translateY(0) rotate(0)}54%{transform:translateY(2%) rotate(1.4deg)}70%{transform:translateY(0) rotate(0)}}
@keyframes crew-avatar-tick{0%{stroke-dashoffset:12;opacity:1}8%,74%{stroke-dashoffset:0;opacity:1}86%,to{stroke-dashoffset:12;opacity:0}}
@keyframes crew-avatar-trot{0%{transform:translate(-3.5%) rotate(-5deg)}50%{transform:translateY(-7%) rotate(0)}to{transform:translate(3.5%) rotate(5deg)}}
@keyframes crew-avatar-wonder{0%{transform:translate(0) rotate(0)}16%{transform:translate(3%) rotate(15deg)}26%{transform:translate(4%) rotate(10deg)}36%,82%{transform:translate(4%) rotate(12deg)}to{transform:translate(0) rotate(0)}}
@keyframes crew-avatar-worry-l{0%,to{transform:rotate(9deg)}50%{transform:rotate(14deg)}}
@keyframes crew-avatar-worry-r{0%,to{transform:rotate(-9deg)}50%{transform:rotate(-14deg)}}
@keyframes crew-avatar-z-rise{0%{transform:translate(0) scale(.5);opacity:0}18%{opacity:1}70%{opacity:.9}to{transform:translate(7px,-13px) scale(1.15);opacity:0}}
@keyframes crew-cel-dark{0%,to{opacity:.12}50%{opacity:.26}}
.crew-cel-spin,.crew-cel-pulse{transform-box:fill-box;transform-origin:center}
.crew-cel-spin{animation:crew-cel-spin 26s linear infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -3s)}
.crew-cel-pulse{animation:crew-cel-pulse 3.4s ease-in-out infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -.4s)}
.crew-cel-crater{opacity:.26;animation:crew-cel-crater 7s ease-in-out infinite}
.crew-cel-crater:nth-of-type(2){animation-delay:-2.3s}
.crew-cel-crater:nth-of-type(3){animation-delay:-4.6s}
@keyframes crew-cel-spin{to{transform:rotate(360deg)}}
@keyframes crew-cel-pulse{0%,to{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes crew-cel-crater{0%,to{opacity:.22}50%{opacity:.34}}
.crew-cel-flame,.crew-cel-tongue,.crew-cel-core{transform-box:fill-box;transform-origin:50% 100%}
.crew-cel-flame{animation:crew-cel-flame 1.3s ease-in-out infinite;animation-delay:calc(var(--crew-avatar-phase, 0) * -.3s)}
.crew-cel-core{animation:crew-cel-core 1.9s ease-in-out infinite}
.crew-cel-tongue{animation:crew-cel-lick-l .9s ease-in-out infinite}
.crew-cel-tongue:nth-of-type(2){animation:crew-cel-lick-r 1.15s ease-in-out infinite;animation-delay:-.4s}
.crew-cel-tongue:nth-of-type(3){animation:crew-cel-lick-c 1.05s ease-in-out infinite;animation-delay:-.25s}
.crew-cel-spark{opacity:0;transform-box:fill-box;transform-origin:center;animation:crew-cel-spark 1.8s ease-out infinite}
.crew-cel-spark:nth-of-type(2){animation-duration:2.2s;animation-delay:-.7s}
.crew-cel-spark:nth-of-type(3){animation-duration:1.6s;animation-delay:-1.3s}
@keyframes crew-cel-flame{0%,to{transform:scale(1) skewX(0)}20%{transform:scale(1.04,.9) skewX(7deg)}45%{transform:scale(.95,1.12) skewX(-6deg)}70%{transform:scale(1.02,.96) skewX(4deg)}85%{transform:scale(.98,1.06) skewX(-3deg)}}
@keyframes crew-cel-core{0%,to{transform:scale(1)}50%{transform:scale(1.03,.97)}}
@keyframes crew-cel-lick-l{0%,to{transform:scale(1) rotate(0)}40%{transform:scale(.7,1.25) rotate(-10deg)}70%{transform:scale(1.05,.75) rotate(4deg)}}
@keyframes crew-cel-lick-r{0%,to{transform:scale(1) rotate(0)}35%{transform:scale(1.05,.7) rotate(-5deg)}65%{transform:scale(.75,1.3) rotate(10deg)}}
@keyframes crew-cel-lick-c{0%,to{transform:scale(1) rotate(0)}40%{transform:scale(.88,1.08) rotate(-5deg)}70%{transform:scale(1.03,.9) rotate(2deg)}}
@keyframes crew-cel-spark{0%{opacity:0;transform:translate(0,8px) scale(.7)}20%{opacity:1}60%{transform:translate(3px,-6px) scale(.6)}to{opacity:0;transform:translate(-2px,-16px) scale(.2)}}
@media(prefers-reduced-motion:reduce){.crew-cel-spin,.crew-cel-pulse,.crew-cel-dark,.crew-cel-crater,.crew-cel-flame,.crew-cel-tongue,.crew-cel-core{animation:none}.crew-cel-spark{display:none}}`;

const STYLE_ID = "crew-avatar-style";

/** Adds the stylesheet to the document once. Harmless next to dist/crew-avatar.css, which holds the same rules. */
export function injectStyles(doc: Document = document): void {
  if (doc.getElementById(STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  doc.head.appendChild(style);
}
