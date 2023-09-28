# Passing information

When building a large code base with a number of different applications you will
probably want to pass some information to them.

We might need
* User information
* Information on where the app should mount
* API access
* Theme information

## Custom props

In a single-spa application we can hand arbitrary information to the lifecycle functions.

```typescript
registerApplication({
    name: 'app1',
    app: () => import('./main.tsx').then(a => a.default),
    activeWhen: '/app1',
    customProps: {
        user: 'Fohan Automeit',
        apiToken: 'c0mpl1c473d$tr1n6',
        domElementGetter: () => document.getElementById('root')!
    }
});
```

with this we can now extend our application to make use of this:

```typescript
type CustomProps = {
    user: string;
    apiToken: string;
    domElementGetter: () => HTMLElement
}

let root: Root | null = null;
const lifecycles: LifeCycles<CustomProps> = {
    bootstrap: () => Promise.resolve(),
    mount: ({ name, singleSpa, mountParcel, ...customProps }) => {
        console.debug('MOUNT', {
            name,
            singleSpa,
            mountParcel,
            customProps,
        });
        root = ReactDOM.createRoot(customProps.domElementGetter());
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        );
        return Promise.resolve();
    },
    unmount: () => {
        root?.unmount();
        return Promise.resolve();
    }
};

export default lifecycles;
```

In order to standardise this and make access easier we can make this info available to the rest
of the app via the React context:

```typescript
import { createContext, useContext } from 'react';

export type CustomProps = {
    user: string;
    apiToken: string;
    domElementGetter: () => HTMLElement
}

const AppContext = createContext<CustomProps | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => {
    return useContext(AppContext);
}
```

```tsx
...
root.render(
  <React.StrictMode>
    <AppContextProvider value={customProps}>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
);
```

With this added we can now easily get access to our user information anywhere in the app.

```tsx
const { user } = useAppContext()!;
```
