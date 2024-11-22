'use client'

import { createContext,useState } from "react";


export const  SideNavigationProvider = createContext(null);





const SideNavigationProviderComponent = ({children}) => {


    const [navigation,setNavigation] = useState('form');

    return (
        <SideNavigationProvider.Provider value={{navigation,setNavigation}}>

            {children}
        
        
        </SideNavigationProvider.Provider>
    )

}

export default SideNavigationProviderComponent;