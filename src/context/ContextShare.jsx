import React,{useState,createContext} from 'react'

export const cartResponseContext=createContext()

function ContextShare({children}) {
    const [cartResponse,setCartResponse]=useState({})

  return (
    <>
      <cartResponseContext.Provider value={{cartResponse,setCartResponse}}>
        {children}
      </cartResponseContext.Provider>
    </>
)
}

export default ContextShare