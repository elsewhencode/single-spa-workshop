# The application

With the root config taken care of we should now create our own little application

A basic application needs to conform to this pattern

```typescript
const application = {
  bootstrap: () => Promise.resolve(), //bootstrap function
  mount: () => Promise.resolve(), //mount function
  unmount: () => Promise.resolve(), //unmount function
}
registerApplication('applicationName', application, activityFunction)
```

## Update our main.tsx

With this in mind we can now remodel out react mounting logic to match this pattern

```tsx
let root: Root | null = null;
const lifecycles: LifeCycles = {
    bootstrap: () => Promise.resolve(),
    mount: () => {
        root = ReactDOM.createRoot(document.getElementById('root')!);
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
```

and point our root config to load from here.

```typescript
registerApplication({
    name: 'app1',
    app: () => import('./main.tsx').then(a => a.default),
    activeWhen: '/app1',
    customProps: {
        some: 'value',
    }
});
```

With this we have got our first microfrontend application!
