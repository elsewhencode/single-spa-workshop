import React from 'react'
import ReactDOM, { Root } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import type { LifeCycles } from 'single-spa';

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

export default lifecycles;
