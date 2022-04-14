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

## yarn dev works
## Error with yarn generate
```
$ nuxi generate
Nuxt CLI v3.0.0-27499173.3e7d6da                                                22:21:34
i Vite client warmed up in 1134ms                                               22:21:39
i Client built in 1623ms                                                        22:21:39
i Building server...                                                            22:21:39
√ Server built in 529ms                                                         22:21:40
√ Generated public .output/public                                         nitro 22:21:40
start Preparing prerenderer...                                            nitro 22:21:40  

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

## Error with yarn build
```
Nuxt CLI v3.0.0-27499173.3e7d6da                                                22:21:06
i Client built in 1665ms                                                        22:21:11
i Building server...                                                            22:21:11
i Vite client warmed up in 1714ms                                               22:21:11
√ Server built in 539ms                                                         22:21:11
√ Generated public .output/public                                         nitro 22:21:11
start Preparing prerenderer...                                            nitro 22:21:11  

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
```
