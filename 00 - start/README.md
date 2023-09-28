# Creating the root config

When building a single spa application it is split into at least two parts.

- **The root config**
This is HTML page that is rendered in the users browser and the script
that will call our individual microfrontend applications.
- **At least one application**
This where our actual application logic lives. This includes the full
lifecycle of an app like mounting/unmounting etc.

## Install single-spa

Let’s add single-spa to our basic vite application

```shell
npm install single-spa
```

We want to keep most of our application logic intact for the future so
let us create a new entry point for our root config.

`src/root-config.ts` (Update the `index.html` to point here)

We can create a basic setup by registering applications for certain paths
and then starting our application.

```typescript
import { start } from 'single-spa';

start();
```

This starts our microfrontend, but without any applications this isn't very exciting.
In order to include a sample application for now we can add System js to load an external
package

```html
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.12.1/dist/system.min.js"></script>
```

Register the sample application

```typescript
import { registerApplication, start } from 'single-spa';

// Simple usage
registerApplication(
    'app2',
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    () => System.import('https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js'),
    (location) => location.pathname.startsWith('/app2'),
    { some: 'value' }
);

// Config with more expressive API
registerApplication({
    name: 'app1',
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    app: () => System.import('https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js'),
    activeWhen: '/app1',
    customProps: {
        some: 'value',
    }
});

start();

```
