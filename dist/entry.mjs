import { i as server_default } from './chunks/astro.b635ba4f.mjs';
import { _ as _page0, a as _page1 } from './chunks/pages/all.5c3f7b1e.mjs';
import 'html-escaper';
/* empty css                                 */import 'svgo';
import 'kleur/colors';
import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import 'mime';
import 'node:stream';

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/portfolio.astro", _page1],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

export { pageMap, renderers };
