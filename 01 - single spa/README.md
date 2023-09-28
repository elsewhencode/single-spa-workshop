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
