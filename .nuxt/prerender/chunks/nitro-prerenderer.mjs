import 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/unenv/runtime/polyfill/fetch.node.mjs';
import { handleCacheHeaders, toEventHandler, createApp, createRouter, lazyEventHandler } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/h3/dist/index.mjs';
import { createFetch as createFetch$1, Headers } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/ohmyfetch/dist/node.mjs';
import destr from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/destr/dist/index.mjs';
import { createRouter as createRouter$1 } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/radix3/dist/index.mjs';
import { createCall, createFetch } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/hookable/dist/index.mjs';
import { snakeCase } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/scule/dist/index.mjs';
import { createDefu } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/defu/dist/defu.mjs';
import { hash } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/ohash/dist/index.mjs';
import { createStorage } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/unstorage/dist/index.mjs';
import { withQuery } from 'file://C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/ufo/dist/index.mjs';

const _runtimeConfig = {app:{baseURL:"\u002F",buildAssetsDir:"\u002F_nuxt\u002F",cdnURL:""},nitro:{routes:{},envPrefix:"NUXT_"},public:{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
const mergeWithEnvVariables = createDefu((obj, key, _value, namespace) => {
  const override = getEnv(namespace ? `${namespace}.${key}` : key);
  if (override !== void 0) {
    obj[key] = override;
    return true;
  }
});
const config = deepFreeze(mergeWithEnvVariables(_runtimeConfig, _runtimeConfig));
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  return key.replace(/[/\\]/g, ":").replace(/^:|:$/g, "");
}

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  magAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key].filter(Boolean).join(":");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.magAge ?? opts.magAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (req) => req.originalUrl || req.url,
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ],
    transform(entry, event) {
      if (event.res.headersSent) {
        return;
      }
      if (handleCacheHeaders(event, {
        modifiedTime: new Date(entry.mtime),
        etag: `W/"${hash(entry.value)}"`,
        maxAge: opts.magAge
      })) {
        return;
      }
      for (const header in entry.value.headers) {
        event.res.setHeader(header, entry.value.headers[header]);
      }
      const cacheControl = [];
      if (opts.swr) {
        if (opts.magAge) {
          cacheControl.push(`s-maxage=${opts.magAge / 1e3}`);
        }
        cacheControl.push("stale-while-revalidate");
      } else if (opts.magAge) {
        cacheControl.push(`max-age=${opts.magAge / 1e3}`);
      }
      if (cacheControl.length) {
        event.res.setHeader("Cache-Control", cacheControl.join(", "));
      }
      if (entry.value.code) {
        event.res.statusCode = entry.value.code;
      }
      return entry.value.body;
    }
  };
  const _handler = toEventHandler(handler);
  return cachedFunction(async (event) => {
    const body = await _handler(event);
    const headers = event.res.getHeaders();
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(_error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(_error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: ""
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (errorObject.statusCode !== 404) {
    console.error("[nuxt] [request error]", errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error) => {
    console.error("[nitro] Error while generating error response", error);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const _e878a5 = () => import('./renderer.mjs');

const handlers = [
  { route: '/**', handler: _e878a5, lazy: true, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.route === "") {
      h3App.use(config.app.baseURL, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();

const localFetch = nitroApp.localFetch;

export { localFetch as l, useRuntimeConfig as u };
