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
