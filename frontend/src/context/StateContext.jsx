"use client";
import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const StateContext = ({children}) => {
    const [officeData, setOfficeData] = useState(null)
    const [orderPhoneCall, setOrderPhonaCall] = useState(false)
    const [isLoadingOffices, setIsLoadingOffices] = useState(true)
    const [isErrorOffices, setIsErrorOffices] = useState(false)
    return (
        <Context.Provider 
            value={{
                orderPhoneCall,
                officeData,
                isLoadingOffices,
                isErrorOffices,
                setOfficeData,
                setOrderPhonaCall,
                setIsLoadingOffices,
                setIsErrorOffices,
            }}>
                {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);