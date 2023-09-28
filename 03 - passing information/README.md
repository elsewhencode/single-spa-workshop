# Bundling things up

With this we now have a single-spa root config and an application, but they are
in the same repository and when bundled we only get our normal vite output:

```shell
> tsc && vite build

vite v4.4.9 building for production...
✓ 38 modules transformed.
dist/index.html                   0.49 kB │ gzip:  0.32 kB
dist/assets/react-35ef61ed.svg    4.13 kB │ gzip:  2.14 kB
dist/assets/main-d526a0c5.css     1.42 kB │ gzip:  0.74 kB
dist/assets/index-56826ec8.js    21.63 kB │ gzip:  7.35 kB
dist/assets/main-4bcda428.js    143.07 kB │ gzip: 45.96 kB
✓ built in 880ms
```

Even if we host our application somewhere the hash for our main.js will change
every time we make any changes. Any outside root config application will lose track
of our application with this.

Vite also assumes that any assets and split js chunks will be found with a base url of `/`
which isn't true if our app is called from a different domain.

## Updating the base url

In vite we can set the base url via the `base` config option. In order to keep this
flexible for each environment we will want to read this from a config option

```typescript
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', 'VITE_');
  return {
    plugins: [react()],
    base: env.VITE_BASE_URL
  };
})
```

`.env.development`
```dotenv
VITE_BASE_URL=/
```

## Setting our app as an entrypoint

```json
{
  "build": {
    "rollupOptions": {
      "input": {
        "root-config": "src/root-config.ts",
        "main": "src/main.tsx"
      },
      "output": {
        "entryFileNames": "[name].js",
        "format": "system"
      }
    }
  }
}
```

With this the format of systemjs should make it consumable from the outside and the
`input` and `output` options should ensure that we have stable outputs

```shell
> tsc && vite build

vite v4.4.9 building for production...
✓ 37 modules transformed.
dist/assets/react-35ef61ed.svg    4.13 kB │ gzip:  2.14 kB
dist/assets/main-20fab710.js      1.27 kB │ gzip:  0.66 kB
dist/root-config.js              20.18 kB │ gzip:  6.71 kB
dist/main.js                    143.56 kB │ gzip: 46.27 kB
✓ built in 924ms
```
