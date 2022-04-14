# Nuxi info

------------------------------
- Operating System: `Windows_NT`
- Node Version:     `v14.17.4`
- Nuxt Version:     `3.0.0-27499173.3e7d6da`
- Package Manager:  `yarn@1.22.11`
- Builder:          `vite`
- User Config:      `-`
- Runtime Modules:  `-`
- Build Modules:    `-`
------------------------------

## yarn dev error
```
Vite server built in 1150ms                                                   22:17:28

 ERROR  [worker reload] [worker] exited                                         22:17:28  

  at Worker.<anonymous> (/C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/nitropack/dist/chunks/prerender.mjs:2038:14)
  at Object.onceWrapper (events.js:520:26)
  at Worker.emit (events.js:400:28)
  at Worker.emit (domain.js:470:12)
  at Worker.[kOnExit] (internal/worker.js:254:10)
  at Worker.<computed>.onexit (internal/worker.js:182:20)

√ Nitro built in 266 ms                                                   nitro 22:17:28

 ERROR  [worker reload] [worker] exited                                         22:17:28  

  at Worker.<anonymous> (/C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/nitropack/dist/chunks/prerender.mjs:2038:14)
  at Object.onceWrapper (events.js:520:26)
  at Worker.emit (events.js:400:28)
  at Worker.emit (domain.js:470:12)
  at Worker.[kOnExit] (internal/worker.js:254:10)
  at Worker.<computed>.onexit (internal/worker.js:182:20)
  ```

## yarn build works, files commited
## yarn generate error
```
Nuxt CLI v3.0.0-27499173.3e7d6da                                                22:18:39
i Vite client warmed up in 1165ms                                               22:18:44
i Client built in 1659ms                                                        22:18:44
i Building server...                                                            22:18:44
√ Server built in 528ms                                                         22:18:45
√ Generated public .output/public                                         nitro 22:18:45
start Preparing prerenderer...                                            nitro 22:18:45  

 ERROR  Only file and data URLs are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:'

  at Loader.defaultResolve [as _resolve] (internal/modules/esm/resolve.js:791:11)
  at Loader.resolve (internal/modules/esm/loader.js:89:40)
  at Loader.getModuleJob (internal/modules/esm/loader.js:242:28)
  at Loader.import (internal/modules/esm/loader.js:177:28)
  at importModuleDynamically (internal/modules/esm/translators.js:114:35)
  at exports.importModuleDynamicallyCallback (internal/process/esm_loader.js:30:14)       
  at prerender (/C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/nitropack/dist/chunks/prerender.mjs:2169:39)
  at async /C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/nuxt3/dist/index.mjs:1215:9
  at async build (/C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/nuxt3/dist/index.mjs:1641:5)
  at async Object.invoke (/C:/Users/Fraser/Websites/2022/nuxt3-example/node_modules/nuxi/dist/chunks/build.mjs:39:5)

error Command failed with exit code 1.
```
