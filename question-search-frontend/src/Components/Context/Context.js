import React, { useState, createContext } from 'react'

export const Context=createContext();

export const ContextProvider = ({children}) => {
    const [selected, setSelected] = useState("Anagram");
  return (
    <Context.Provider value={{ selected, setSelected }}>
        {children}
    </Context.Provider>
  )
}
