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
