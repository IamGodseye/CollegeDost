import React from 'react'

const { createContext, useState } = require("react")


export const LoginContext = createContext(null);


const ContextProvider=({children})=>{
    const[account,setAccount]=useState(null);
    

    return(
        <LoginContext.Provider value={{account,setAccount}}>
           {children}
        </LoginContext.Provider>
    );
}


export default ContextProvider;