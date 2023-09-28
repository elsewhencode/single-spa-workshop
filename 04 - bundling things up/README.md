# Extra credit

So far we have been showing a different app depending on the path of the app, but
with a microfrontend framework you can display any amount of different apps on the
same page.

## Additional dependency

To run the layout we need `single-spa-layout`

## Template

In order to describe to single spa how we want to structure the app we need to 
provide a template. Since we are running the app from the template we can remove `#root`
from our `index.html`

For this we create a `template.html` file (alternatively this could be added within the `index.html`)

```html
<single-spa-router>
    <application name="header" props="user,apiToken"></application>
    <div id="micro-app">
        <application name="app" props="user,apiToken,domElementGetter"></application>
    </div>
</single-spa-router>

```

To create the app we need to construct our app with this layout and register the applications
differently.

```typescript
import template from './template.html?raw';
import { constructApplications, constructLayoutEngine, constructRoutes } from 'single-spa-layout';


const routes = constructRoutes(template, { props: {
        user: 'Fohan Automeit',
        apiToken: 'c0mpl1c473d$tr1n6',
        domElementGetter: () => document.getElementById('single-spa-application:app')!
    }, loaders: {} });
```

Here we can pass the same props as before and then determine in the template where they will be passed

```typescript
import template from './template.html?raw';
import { constructApplications, constructLayoutEngine, constructRoutes } from 'single-spa-layout';


const routes = constructRoutes(template, { props: {
        user: 'Fohan Automeit',
        apiToken: 'c0mpl1c473d$tr1n6',
        domElementGetter: () => document.getElementById('single-spa-application:app')!
    }, loaders: {} });
```

With the routes constructed we can map the application names to the applications and activate the engine


```typescript
const applications = constructApplications({
    routes,
    loadApp({ name }) {
        switch (name) {
            case 'app':
                return import('./main.tsx').then(a => a.default);
            case 'header':
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
                return System.import('https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js');
            default:
                throw Error('Unknown Application');
        }
    },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();

start();
```
