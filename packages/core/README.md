# @crew-avatar/core

Framework-free engine behind every crew-avatar package: 50 shape definitions, the SVG renderer and `mountAvatar()`.

```sh
npm install @crew-avatar/core
```

```js
import { mountAvatar } from "@crew-avatar/core";

const avatar = mountAvatar(document.querySelector("#me"), { shape: "star", state: "working" });
avatar.update({ shape: "star", state: "success" });
avatar.destroy();
```

Options, states, theming and the full shape catalog: https://github.com/im-ian/crew-avatar#readme

MIT, except the Material Shapes contour data in `third_party/material-shapes` (Apache 2.0).
