import { createContext } from "react";

export const BioContext = createContext();

export const BioProvider = ({children}) => {
    const myName = "Vaish";
    const myage= 20;
    // return <BioContext.Provider value = {myName}>{children}
    return <BioContext.Provider value = {{ myName : myName, myage : myage }}>
        {children}
    </BioContext.Provider>
};