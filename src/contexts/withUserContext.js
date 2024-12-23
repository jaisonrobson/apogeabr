import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext({})

export const UserContextProvider = ({ children, ...props }) => {
    const [state, setState] = useState({ user: { isLogged: false, id: 0 }})

    const value = {
        ...state,
        login: (newValue) => setState((oldState) => ({...oldState, user: { isLogged: true, id: newValue.id }})),
    }

    useEffect(() => {
        console.log(state)
    }, [state])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}