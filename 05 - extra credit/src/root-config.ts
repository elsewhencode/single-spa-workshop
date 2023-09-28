import { registerApplication, start } from 'single-spa';
import template from './template.html?raw';
import { constructApplications, constructLayoutEngine, constructRoutes } from 'single-spa-layout';


const routes = constructRoutes(template, { props: {
        user: 'Fohan Automeit',
        apiToken: 'c0mpl1c473d$tr1n6',
        domElementGetter: () => document.getElementById('single-spa-application:app')!
    }, loaders: {} });

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
