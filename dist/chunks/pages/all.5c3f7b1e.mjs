/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, b as addAttribute, u as unescapeHTML, d as renderComponent, F as Fragment, e as renderSlot, f as renderHead, g as createCollectionToGlobResultMap, h as createGetCollection } from '../astro.b635ba4f.mjs';
import { optimize } from 'svgo';
import { dim, bold, red, yellow, cyan, green } from 'kleur/colors';
import fs from 'node:fs/promises';
import 'node:path';
import { fileURLToPath } from 'node:url';
import 'http-cache-semantics';
import 'node:os';
import sizeOf from 'image-size';
import 'magic-string';
import mime from 'mime';
import 'node:stream';

const $$Astro$x = createAstro("https://mbartido.github.io");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${maybeRenderHead($$result)}<section data-testid="about" id="about" class="mb-10 flex flex-col items-center justify-center lg:mb-0 lg:flex-row">
	<div class="flex w-full flex-col items-center justify-center lg:mb-0 lg:w-1/2">
		<h2 class="text-2xl text-purple lg:text-4xl font-serenity">About Me</h2>
		<span class="mb-6 ml-2 h-1 w-20 bg-purple"></span>
	</div>

	<div class="w-full text-black dark:text-white lg:w-1/2">
		<p class="mb-2 mx-2 font-light font-monospace">
			<!-- I'm a software engineer currently living in the Bay Area, with lots of experiences 
			in the start up field. I have a specialization and preference for front-end (React, Vue, and tech of that nature), 
			but have worked with back-end too (SQL, Postgres, etc.). Besides work, I enjoy: photography, riding my motorcycle,
			and probably gaming too much. I'm always open to hear about new opportunities, so if you think I can help you please
			reach out to me at <a class="text-purple" href="mailto: michaelvbartido@gmail.com">michaelvbartido@gmail.com</a>, or the contacts below. -->
            👨‍💻 &nbsp;<span class="font-bold">Software Engineer | Bay Area</span><br>
            Passionate software engineer based in the Bay Area, specializing in front-end development (React, Vue, etc.) while having experiences with back-end tech (SQL, Postgres, etc.). My journey in the startup world has honed my skills and fueled my love for creating useful, intuitive products.<br><br>
            📸 &nbsp;<span class="font-bold">Photography Enthusiast | Motorcyclist | Gamer</span><br>
            Beyond code, I'm an avid photographer, a casual motorcycle rider, and I occasionally game. I'm also currently beginning to take on golf. Wish me luck!<br><br>
            🚀 &nbsp;<span class="font-bold">Let's Collaborate</span><br>
            I'm always open to exciting new opportunities. If you believe I can be an asset to your project, reach out at <a class="text-purple" href="mailto: michaelvbartido@gmail.com">michaelvbartido@gmail.com</a> or through the contact options below.
		</p>
	</div>
</section>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/About.astro");

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$w = createAstro("https://mbartido.github.io");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-icon/lib/Icon.astro");

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$v = createAstro("https://mbartido.github.io");
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>
    ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}
</svg>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-icon/lib/Spritesheet.astro");

const $$Astro$u = createAstro("https://mbartido.github.io");
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}
${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-icon/lib/SpriteProvider.astro");

const $$Astro$t = createAstro("https://mbartido.github.io");
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>
    ${title ? renderTemplate`<title>${title}</title>` : ""}
    <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use>
</svg>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-icon/lib/Sprite.astro");

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$s = createAstro("https://mbartido.github.io");
const $$Social = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Social;
  return renderTemplate`${maybeRenderHead($$result)}<a href="https://github.com/mbartido" target="_blank" rel="noopener" aria-label="github">${renderComponent($$result, "Icon", $$Icon, { "class": "h-8 hover:text-orange dark:hover:text-purple md:h-12", "name": "simple-icons:github" })}</a>
<a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="linkedin">${renderComponent($$result, "Icon", $$Icon, { "class": "h-8 hover:text-purple dark:hover:text-purple md:h-12", "name": "simple-icons:linkedin" })}</a>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/ui/Social.astro");

const $$Astro$r = createAstro("https://mbartido.github.io");
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${maybeRenderHead($$result)}<section data-testid="contact" id="contact" class="flex flex-col flex-wrap items-center justify-center gap-8 text-black dark:text-white mb-24 lg:mt-52">
	<div class="flex w-full flex-col items-center justify-center">
		<h2 class="text-2xl text-purple lg:text-4xl font-serenity">Contact Me</h2>
		<span class="mb-6 ml-2 h-1 w-20 bg-purple"></span>		
	</div>
	<div class="flex flex-col gap-8 lg:flex lg:flex-row lg:gap-20">
		${renderComponent($$result, "Social", $$Social, {})}
	</div>
</section>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/Contact.astro");

const heroImage = {"src":"/_astro/hero.1db2193c.svg","width":596,"height":544,"format":"svg"};

const $$Astro$q = createAstro("https://mbartido.github.io");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Hero;
  return renderTemplate`${maybeRenderHead($$result)}<section data-testid="hero" class="flex h-screen flex-col-reverse items-center justify-center text-center lg:flex-row">
	<div class="mb-10 flex flex-col items-center lg:mb-0 lg:w-1/2">
		<div>
			<h1 class="mb-10 text-3xl text-black dark:text-white lg:text-5xl">
				Hi! My name is <span class="text-purple">Michael Bartido</span> and I like making cool things.
			</h1>
		</div>
		<!-- <div class="mb-10">
			<Button style={'primary'} size={'lg'} class={'flex'} name="learn more">Learn more</Button>
		</div> -->
	</div>
	<div data-testid="hero-img" class="mb-10 flex w-1/2 items-center justify-center">
		<!-- <Image
			src={heroImage }
			alt="Coding girl"
			aspectRatio="4:4"
			format="png"
			width={600}
			height={600}
			loading="eager"
		/> -->
		<img${addAttribute(heroImage.src, "src")} width="500" height="500">
	</div>
</section>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/Hero.astro");

const $$Astro$p = createAstro("https://mbartido.github.io");
const $$BackToTop = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$BackToTop;
  return renderTemplate`${maybeRenderHead($$result)}<button data-testId="back-to-top-button" type="button" aria-label="back to top button" data-mdb-ripple="true" data-mdb-ripple-color="light" class="fixed bottom-5 right-5 inline-block rounded-full bg-black p-3 text-xs font-medium uppercase leading-tight shadow-md transition duration-150 ease-in-out hover:bg-purple hover:shadow-lg focus:outline-none focus:ring-0 dark:bg-purple dark:hover:bg-white dark:hover:text-black" id="btn-back-to-top">
	<svg aria-hidden="true" focusable="false" data-prefix="fas" class="h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
</button>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/ui/BackToTop.astro");

const $$Astro$o = createAstro("https://mbartido.github.io");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<footer data-testid="footer" class="p-6 text-center text-sm text-black dark:text-white">
	<p>
		Copyright © ${( new Date()).getFullYear()}. All rights reserved. Made by <a href="https://github.com/mbartido" target="_blank" rel="noopener">
			<span class="text-purple"> Michael Bartido.</span>
		</a>
	</p>
</footer>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/Footer.astro");

const $$Astro$n = createAstro("https://mbartido.github.io");
const $$ToggleTheme = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$ToggleTheme;
  return renderTemplate`${maybeRenderHead($$result)}<div class="theme-switch-wrapper md:flex md:items-center astro-NGCSDC2W">
	<label data-testid="theme-switch" class="theme-switch relative inline-block h-[34px] w-[60px] astro-NGCSDC2W" for="checkbox">
		<input type="checkbox" id="checkbox" class="hidden astro-NGCSDC2W">
		<div class="slider absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-full bg-black before:absolute before:bottom-[4px] before:left-[4px] before:h-[26px] before:w-[26px] before:rounded-full before:bg-purple before:transition-[0.4s] dark:bg-white astro-NGCSDC2W">
			<circle cx="12" cy="12" r="5" class="astro-NGCSDC2W"></circle>
			<line x1="12" y1="1" x2="12" y2="3" class="astro-NGCSDC2W"></line>
			<line x1="12" y1="21" x2="12" y2="23" class="astro-NGCSDC2W"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" class="astro-NGCSDC2W"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" class="astro-NGCSDC2W"></line>
			<line x1="1" y1="12" x2="3" y2="12" class="astro-NGCSDC2W"></line>
			<line x1="21" y1="12" x2="23" y2="12" class="astro-NGCSDC2W"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" class="astro-NGCSDC2W"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" class="astro-NGCSDC2W"></line>
		</div>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" class="astro-NGCSDC2W"></path>
	</label>
</div>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/ui/ToggleTheme.astro");

const $$Astro$m = createAstro("https://mbartido.github.io");
const $$Astronav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Astronav;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}

`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-navbar/src/Astronav.astro");

const $$Astro$l = createAstro("https://mbartido.github.io");
const $$MenuIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$MenuIcon;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<button id="astronav-menu">
  ${renderSlot($$result, $$slots["default"], renderTemplate`
    <svg fill="currentColor"${addAttribute([className], "class:list")} width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>Menu</title>
      <path class="astronav-toggle hidden" fill-rule="evenodd" clip-rule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"></path>
      <path class="astronav-toggle" fill-rule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"></path>
    </svg>
  `)}
</button>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-navbar/src/components/MenuIcon.astro");

const $$Astro$k = createAstro("https://mbartido.github.io");
const $$OpenIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$OpenIcon;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(["astronav-toggle", className], "class:list")}>${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-navbar/src/components/OpenIcon.astro");

const $$Astro$j = createAstro("https://mbartido.github.io");
const $$CloseIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$CloseIcon;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(["astronav-toggle hidden", className], "class:list")}>${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-navbar/src/components/CloseIcon.astro");

const $$Astro$i = createAstro("https://mbartido.github.io");
const $$MenuItems = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$MenuItems;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(["astronav-toggle", className], "class:list")}>
    ${renderSlot($$result, $$slots["default"])}
</nav>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-navbar/src/components/MenuItems.astro");

const $$Astro$h = createAstro("https://mbartido.github.io");
const $$Dropdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Dropdown;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<menu${addAttribute(["astronav-dropdown", className], "class:list")} aria-expanded="false">${renderSlot($$result, $$slots["default"])}</menu>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-navbar/src/components/Dropdown.astro");

const $$Astro$g = createAstro("https://mbartido.github.io");
const $$DropdownItems = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$DropdownItems;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["dropdown-toggle hidden", className], "class:list")}>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-navbar/src/components/DropdownItems.astro");

const $$Astro$f = createAstro("https://mbartido.github.io");
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Navbar;
  const menuitems = [
    {
      title: "About",
      path: "/#about"
    },
    // {
    // 	title: 'Projects',
    // 	path: '#projects',
    // },
    {
      title: "Contact",
      path: "/#contact"
    }
  ];
  return renderTemplate`${maybeRenderHead($$result)}<header data-testId="header" class="my-5 flex flex-col items-center justify-between lg:flex-row">
	${renderComponent($$result, "Astronav", $$Astronav, {}, { "default": ($$result2) => renderTemplate`
		
		${renderComponent($$result2, "MenuItems", $$MenuItems, { "class": "mt-2 hidden w-full lg:mt-0 lg:flex lg:w-auto" }, { "default": ($$result3) => renderTemplate`
			<ul class="flex flex-col lg:flex-row lg:gap-3">
				${menuitems.map((item) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate`
							<li>
								<a aria-label="navigation link"${addAttribute(item.path, "href")} class="flex py-2 text-black hover:text-purple dark:text-white dark:hover:text-purple lg:px-3">
									${item.title}
								</a>
							</li>
						` })}`)}
				<li class="mt-1">${renderComponent($$result3, "ToggleTheme", $$ToggleTheme, {})}</li>
			</ul>
		` })}
	` })}
</header>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/Navbar.astro");

const $$Astro$e = createAstro("https://mbartido.github.io");
const $$OpenGraphArticleTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}
${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}
${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}
${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}
${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}
${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro");

const $$Astro$d = createAstro("https://mbartido.github.io");
const $$OpenGraphBasicTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}>
<meta property="og:type"${addAttribute(openGraph.basic.type, "content")}>
<meta property="og:image"${addAttribute(openGraph.basic.image, "content")}>
<meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro");

const $$Astro$c = createAstro("https://mbartido.github.io");
const $$OpenGraphImageTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>
${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}
${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}
${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}
${!(height === null) ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}
${!(alt === null) ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-seo/src/components/OpenGraphImageTags.astro");

const $$Astro$b = createAstro("https://mbartido.github.io");
const $$OpenGraphOptionalTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}
${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}
${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}
${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}
${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}
${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}
${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro");

const $$Astro$a = createAstro("https://mbartido.github.io");
const $$ExtendedTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}
${props.extend.meta?.map(({ content, httpEquiv, name, property }) => renderTemplate`<meta${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(name, "name")}${addAttribute(property, "property")}>`)}`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-seo/src/components/ExtendedTags.astro");

const $$Astro$9 = createAstro("https://mbartido.github.io");
const $$TwitterTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}
${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}
${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}
${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}
${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}
${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}
${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-seo/src/components/TwitterTags.astro");

const $$Astro$8 = createAstro("https://mbartido.github.io");
const $$SEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || props.openGraph.basic.title == null || props.openGraph.basic.type == null || props.openGraph.basic.image == null) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is stongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}

${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}

<link rel="canonical"${addAttribute(Astro2.props.canonical || Astro2.url.href, "href")}>

${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}

<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>

${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}
${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}
${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/astro-seo/src/SEO.astro");

const $$Astro$7 = createAstro("https://mbartido.github.io");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Michael Bartido | Web developer" } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth" data-testid="html">
	<head>
		${renderComponent($$result, "SEO", $$SEO, { "title": "Michael Bartido", "description": "A personal website for software engineer, Michael Bartido." })}
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<link rel="stylesheet" href="https://use.typekit.net/ddx8hey.css">
		<title>${title}</title>
	${renderHead($$result)}</head>
	<body class="mx-auto max-w-screen-xl bg-white px-5 font-sans text-white dark:bg-black xs:text-[16px] md:text-[18px]">
		${renderComponent($$result, "Navbar", $$Navbar, {})}
		${renderSlot($$result, $$slots["default"])}
		${renderComponent($$result, "Footer", $$Footer, {})}
		
	</body>
</html>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/layouts/Layout.astro");

const $$Astro$6 = createAstro("https://mbartido.github.io");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<main>
		${renderComponent($$result2, "Hero", $$Hero, {})}
		${renderComponent($$result2, "About", $$About, {})}
		<!-- <Projects /> -->
		${renderComponent($$result2, "Contact", $$Contact, {})}
		${renderComponent($$result2, "BackToTop", $$BackToTop, {})}
	</main>
` })}`;
}, "/Users/michaelbartido/Desktop/portfolio/src/pages/index.astro");

const $$file$1 = "/Users/michaelbartido/Desktop/portfolio/src/pages/index.astro";
const $$url$1 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const PREFIX = "@astrojs/image";
const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function getPrefix(level, timestamp) {
  let prefix = "";
  if (timestamp) {
    prefix += dim(dateTimeFormat.format(/* @__PURE__ */ new Date()) + " ");
  }
  switch (level) {
    case "debug":
      prefix += bold(green(`[${PREFIX}] `));
      break;
    case "info":
      prefix += bold(cyan(`[${PREFIX}] `));
      break;
    case "warn":
      prefix += bold(yellow(`[${PREFIX}] `));
      break;
    case "error":
      prefix += bold(red(`[${PREFIX}] `));
      break;
  }
  return prefix;
}
const log = (_level, dest) => ({ message, level, prefix = true, timestamp = true }) => {
  if (levels[_level] >= levels[level]) {
    dest(`${prefix ? getPrefix(level, timestamp) : ""}${message}`);
  }
};
const error = log("error", console.error);

function isRemoteImage(src) {
  return /^(https?:)?\/\//.test(src);
}
function removeQueryString(src) {
  const index = src.lastIndexOf("?");
  return index > 0 ? src.substring(0, index) : src;
}
function extname(src) {
  const base = basename(src);
  const index = base.lastIndexOf(".");
  if (index <= 0) {
    return "";
  }
  return base.substring(index);
}
function basename(src) {
  return removeQueryString(src.replace(/^.*[\\\/]/, ""));
}

async function metadata(src, data) {
  const file = data || await fs.readFile(src);
  const { width, height, type, orientation } = await sizeOf(file);
  const isPortrait = (orientation || 0) >= 5;
  if (!width || !height || !type) {
    return void 0;
  }
  return {
    src: fileURLToPath(src),
    width: isPortrait ? height : width,
    height: isPortrait ? width : height,
    format: type,
    orientation
  };
}

function isOutputFormat(value) {
  return ["avif", "jpeg", "jpg", "png", "webp", "svg"].includes(value);
}
function isAspectRatioString(value) {
  return /^\d*:\d*$/.test(value);
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio) {
    return void 0;
  }
  if (typeof aspectRatio === "number") {
    return aspectRatio;
  } else {
    const [width, height] = aspectRatio.split(":");
    return parseInt(width) / parseInt(height);
  }
}
function isSSRService(service) {
  return "transform" in service;
}
class BaseSSRService {
  async getImageAttributes(transform) {
    const { width, height, src, format, quality, aspectRatio, ...rest } = transform;
    return {
      ...rest,
      width,
      height
    };
  }
  serializeTransform(transform) {
    const searchParams = new URLSearchParams();
    if (transform.quality) {
      searchParams.append("q", transform.quality.toString());
    }
    if (transform.format) {
      searchParams.append("f", transform.format);
    }
    if (transform.width) {
      searchParams.append("w", transform.width.toString());
    }
    if (transform.height) {
      searchParams.append("h", transform.height.toString());
    }
    if (transform.aspectRatio) {
      searchParams.append("ar", transform.aspectRatio.toString());
    }
    if (transform.fit) {
      searchParams.append("fit", transform.fit);
    }
    if (transform.background) {
      searchParams.append("bg", transform.background);
    }
    if (transform.position) {
      searchParams.append("p", encodeURI(transform.position));
    }
    searchParams.append("href", transform.src);
    return { searchParams };
  }
  parseTransform(searchParams) {
    if (!searchParams.has("href")) {
      return void 0;
    }
    let transform = { src: searchParams.get("href") };
    if (searchParams.has("q")) {
      transform.quality = parseInt(searchParams.get("q"));
    }
    if (searchParams.has("f")) {
      const format = searchParams.get("f");
      if (isOutputFormat(format)) {
        transform.format = format;
      }
    }
    if (searchParams.has("w")) {
      transform.width = parseInt(searchParams.get("w"));
    }
    if (searchParams.has("h")) {
      transform.height = parseInt(searchParams.get("h"));
    }
    if (searchParams.has("ar")) {
      const ratio = searchParams.get("ar");
      if (isAspectRatioString(ratio)) {
        transform.aspectRatio = ratio;
      } else {
        transform.aspectRatio = parseFloat(ratio);
      }
    }
    if (searchParams.has("fit")) {
      transform.fit = searchParams.get("fit");
    }
    if (searchParams.has("p")) {
      transform.position = decodeURI(searchParams.get("p"));
    }
    if (searchParams.has("bg")) {
      transform.background = searchParams.get("bg");
    }
    return transform;
  }
}

function resolveSize(transform) {
  if (transform.width && transform.height) {
    return transform;
  }
  if (!transform.width && !transform.height) {
    throw new Error(`"width" and "height" cannot both be undefined`);
  }
  if (!transform.aspectRatio) {
    throw new Error(
      `"aspectRatio" must be included if only "${transform.width ? "width" : "height"}" is provided`
    );
  }
  let aspectRatio;
  if (typeof transform.aspectRatio === "number") {
    aspectRatio = transform.aspectRatio;
  } else {
    const [width, height] = transform.aspectRatio.split(":");
    aspectRatio = Number.parseInt(width) / Number.parseInt(height);
  }
  if (transform.width) {
    return {
      ...transform,
      width: transform.width,
      height: Math.round(transform.width / aspectRatio)
    };
  } else if (transform.height) {
    return {
      ...transform,
      width: Math.round(transform.height * aspectRatio),
      height: transform.height
    };
  }
  return transform;
}
async function resolveTransform(input) {
  if (typeof input.src === "string") {
    return resolveSize(input);
  }
  const metadata = "then" in input.src ? (await input.src).default : input.src;
  let { width, height, aspectRatio, background, format = metadata.format, ...rest } = input;
  if (!width && !height) {
    width = metadata.width;
    height = metadata.height;
  } else if (width) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    height = height || Math.round(width / ratio);
  } else if (height) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    width = width || Math.round(height * ratio);
  }
  return {
    ...rest,
    src: metadata.src,
    width,
    height,
    aspectRatio,
    format,
    background
  };
}
async function getImage(transform) {
  var _a, _b, _c;
  if (!transform.src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  let loader = (_a = globalThis.astroImage) == null ? void 0 : _a.loader;
  if (!loader) {
    const { default: mod } = await import('../squoosh.69cc5b47.mjs').catch(() => {
      throw new Error(
        "[@astrojs/image] Builtin image loader not found. (Did you remember to add the integration to your Astro config?)"
      );
    });
    loader = mod;
    globalThis.astroImage = globalThis.astroImage || {};
    globalThis.astroImage.loader = loader;
  }
  const resolved = await resolveTransform(transform);
  const attributes = await loader.getImageAttributes(resolved);
  const isDev = (_b = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":true,"SITE":"https://mbartido.github.io","ASSETS_PREFIX":undefined},{_:process.env._,SSR:true,}))) == null ? void 0 : _b.DEV;
  const isLocalImage = !isRemoteImage(resolved.src);
  const _loader = isDev && isLocalImage ? globalThis.astroImage.defaultLoader : loader;
  if (!_loader) {
    throw new Error("@astrojs/image: loader not found!");
  }
  const { searchParams } = isSSRService(_loader) ? _loader.serializeTransform(resolved) : globalThis.astroImage.defaultLoader.serializeTransform(resolved);
  const imgSrc = !isLocalImage && resolved.src.startsWith("//") ? `https:${resolved.src}` : resolved.src;
  let src;
  if (/^[\/\\]?@astroimage/.test(imgSrc)) {
    src = `${imgSrc}?${searchParams.toString()}`;
  } else {
    searchParams.set("href", imgSrc);
    src = `/_image?${searchParams.toString()}`;
  }
  if ((_c = globalThis.astroImage) == null ? void 0 : _c.addStaticImage) {
    src = globalThis.astroImage.addStaticImage(resolved);
  }
  return {
    ...attributes,
    src
  };
}

async function resolveAspectRatio({ src, aspectRatio }) {
  if (typeof src === "string") {
    return parseAspectRatio(aspectRatio);
  } else {
    const metadata = "then" in src ? (await src).default : src;
    return parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
  }
}
async function resolveFormats({ src, formats }) {
  const unique = new Set(formats);
  if (typeof src === "string") {
    unique.add(extname(src).replace(".", ""));
  } else {
    const metadata = "then" in src ? (await src).default : src;
    unique.add(extname(metadata.src).replace(".", ""));
  }
  return Array.from(unique).filter(Boolean);
}
async function getPicture(params) {
  const { src, alt, widths, fit, position, background } = params;
  if (!src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  if (!widths || !Array.isArray(widths)) {
    throw new Error("[@astrojs/image] at least one `width` is required. ex: `widths={[100]}`");
  }
  const aspectRatio = await resolveAspectRatio(params);
  if (!aspectRatio) {
    throw new Error("`aspectRatio` must be provided for remote images");
  }
  const allFormats = await resolveFormats(params);
  const lastFormat = allFormats[allFormats.length - 1];
  const maxWidth = Math.max(...widths);
  let image;
  async function getSource(format) {
    const imgs = await Promise.all(
      widths.map(async (width) => {
        const img = await getImage({
          src,
          alt,
          format,
          width,
          fit,
          position,
          background,
          aspectRatio
        });
        if (format === lastFormat && width === maxWidth) {
          image = img;
        }
        return `${img.src} ${width}w`;
      })
    );
    return {
      type: mime.getType(format) || format,
      srcset: imgs.join(",")
    };
  }
  const sources = await Promise.all(allFormats.map((format) => getSource(format)));
  return {
    sources,
    // @ts-expect-error image will always be defined
    image
  };
}

const $$Astro$5 = createAstro("https://mbartido.github.io");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Image;
  const { loading = "lazy", decoding = "async", ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    warnForMissingAlt();
  }
  const attrs = await getImage(props);
  return renderTemplate`${maybeRenderHead($$result)}<img${spreadAttributes(attrs)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/@astrojs/image/components/Image.astro");

const $$Astro$4 = createAstro("https://mbartido.github.io");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Picture;
  const {
    src,
    alt,
    sizes,
    widths,
    aspectRatio,
    fit,
    background,
    position,
    formats = ["avif", "webp"],
    loading = "lazy",
    decoding = "async",
    ...attrs
  } = Astro2.props;
  if (alt === void 0 || alt === null) {
    warnForMissingAlt();
  }
  const { image, sources } = await getPicture({
    src,
    widths,
    formats,
    aspectRatio,
    fit,
    background,
    position,
    alt
  });
  delete image.width;
  delete image.height;
  return renderTemplate`${maybeRenderHead($$result)}<picture>
	${sources.map((attrs2) => renderTemplate`<source${spreadAttributes(attrs2)}${addAttribute(sizes, "sizes")}>`)}
	<img${spreadAttributes(image)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${spreadAttributes(attrs)}>
</picture>`;
}, "/Users/michaelbartido/Desktop/portfolio/node_modules/@astrojs/image/components/Picture.astro");

let altWarningShown = false;
function warnForMissingAlt() {
  if (altWarningShown === true) {
    return;
  }
  altWarningShown = true;
  console.warn(`
[@astrojs/image] "alt" text was not provided for an <Image> or <Picture> component.

A future release of @astrojs/image may throw a build error when "alt" text is missing.

The "alt" attribute holds a text description of the image, which isn't mandatory but is incredibly useful for accessibility. Set to an empty string (alt="") if the image is not a key part of the content (it's decoration or a tracking pixel).
`);
}

const $$Astro$3 = createAstro("https://mbartido.github.io");
const $$Tags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Tags;
  const { tags } = Astro2.props;
  return renderTemplate`${tags && renderTemplate`${maybeRenderHead($$result)}<div class="mt-2 flex w-2/3 flex-row flex-wrap justify-between">
			${tags.map((tag) => renderTemplate`<span class="inline-block rounded py-2 text-xs text-black  lg:py-1">#${tag}</span>`)}
		</div>`}`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/ui/Tags.astro");

const $$Astro$2 = createAstro("https://mbartido.github.io");
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Card;
  const { imagePath, url = "#", imageUrl = "", alt = "Project image", title = "Project title", tags = ["Tags"] } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"/src/assets/univfy.png": () => import('../univfy.422bd51a.mjs')});
  if (!images[imagePath])
    throw new Error(`"${imagePath}" does not exist in glob: "src/assets/*.{jpeg,jpg,png,gif}"`);
  return renderTemplate`${maybeRenderHead($$result)}<section class="w-full p-4 md:w-1/2 lg:w-1/3">
	<article data-testId="card" class="rounded-xl bg-white p-3 shadow-lg duration-100 hover:scale-105 hover:transform hover:shadow-xl">
		<a${addAttribute(url, "href")} aria-label="link to project">
			<div class="relative flex items-end overflow-hidden rounded-xl">
				${renderComponent($$result, "Image", $$Image, { "src": images[imagePath](), "alt": alt, "aspectRatio": "4:4", "format": "png", "width": 400, "height": 400, "loading": "eager" })}
			</div>
			<div class="mt-1 p-2">
				<h3 class="text-xl text-purple lg:text-2xl">${title}</h3>
				${renderComponent($$result, "Tags", $$Tags, { "tags": tags })}
			</div>
		</a>
	</article>
</section>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/ui/Card.astro");

// astro-head-inject

const contentDir = '/src/content/';

const entryGlob = /* #__PURE__ */ Object.assign({"/src/content/projects/project-1.md": () => import('../project-1.7a9333a6.mjs')

});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: entryGlob,
	contentDir,
});

let lookupMap = {};
lookupMap = {"projects":{"project-1":"/src/content/projects/project-1.md"}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/projects/project-1.md": () => import('../project-1.3e34f91d.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	collectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$1 = createAstro("https://mbartido.github.io");
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Projects;
  const projects = await getCollection("projects", ({ data }) => {
    return !data.inProgress;
  });
  return renderTemplate`${maybeRenderHead($$result)}<section data-testid="projects" id="projects" class="mb-10 flex flex-col items-center justify-center md:mb-0 md:h-screen">
	<h2 class="font-monospace text-2xl text-purple lg:text-4xl">Projects</h2>
	<span class="mb-10 h-1 w-10 bg-purple"></span>
	<div class="mb-10 flex w-full flex-col flex-wrap items-center md:flex-row">
		${projects.map((project) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "url": project.data.link, "title": project.data.title, "alt": project.data.img_alt, "tags": project.data.tags, "imagePath": project.data.imagePath })}`)}
	</div>
	<a href="https://github.com/mbartido" target="_blank" rel="noopener" class="flex flex-row text-black hover:text-purple dark:text-white dark:hover:text-purple" aria-label="link to repository">
		View full private projects archive
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 h-6 w-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
		</svg>
	</a>
</section>`;
}, "/Users/michaelbartido/Desktop/portfolio/src/components/Projects.astro");

const $$Astro = createAstro("https://mbartido.github.io");
const $$Portfolio = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Portfolio;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<main>
        ${renderComponent($$result2, "Projects", $$Projects, {})}
	</main>
` })}`;
}, "/Users/michaelbartido/Desktop/portfolio/src/pages/portfolio.astro");

const $$file = "/Users/michaelbartido/Desktop/portfolio/src/pages/portfolio.astro";
const $$url = "/portfolio";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Portfolio,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { BaseSSRService as B, _page0 as _, _page1 as a, error as e, isRemoteImage as i, metadata as m };
