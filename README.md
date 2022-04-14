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

## Error with yarn generate
```
Nuxt CLI v3.0.0-27499173.3e7d6da                                                22:13:19
i Vite client warmed up in 1144ms                                               22:13:24
i Client built in 1636ms                                                        22:13:24
i Building server...                                                            22:13:24
√ Server built in 529ms                                                         22:13:25
√ Generated public .output/public                                         nitro 22:13:25
start Preparing prerenderer...                                            nitro 22:13:25  

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
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.  
```
