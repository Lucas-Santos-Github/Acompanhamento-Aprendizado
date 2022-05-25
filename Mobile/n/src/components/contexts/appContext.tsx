import React, { createContext, Dispatch, ReactNode, useState } from 'react'


interface AppContextData {
    user: any;
    setUser: Dispatch<any>
}

interface AppContextProviderProps {
    children: ReactNode;
}


const AppContext = createContext({} as AppContextData)


const AppContextProvider = ({ children }: AppContextProviderProps) => {

    const [user, setUser] = useState({});

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );

}

export { AppContextProvider, AppContext}