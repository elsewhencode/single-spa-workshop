import React from 'react'
import ReactDOM, { Root } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import type { LifeCycles } from 'single-spa';
import { AppContextProvider, CustomProps } from './app-context.ts';


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
                <AppContextProvider value={customProps}>
                    <App />
                </AppContextProvider>
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
