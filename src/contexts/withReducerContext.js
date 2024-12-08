import React, { createContext, useReducer } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import { getDisplayName } from '../util/hoc'
import { reducer, initialState } from 'store'

export const ReducerContext = createContext({})

export const withReducerContext = (WrappedComponent) => {
    const WithReducerContext = (props) => {
        const [state, dispatch] = useReducer(reducer, initialState)

        const value = {
            ...state,
            dispatch,
        }

        return (
            <ReducerContext.Provider value={value}>
                <WrappedComponent {...props} />
            </ReducerContext.Provider>
        )
    }

    hoistNonReactStatic(WithReducerContext, WrappedComponent)

    WithReducerContext.displayName = `WithReducerContext(${getDisplayName(WrappedComponent)})`

    return WithReducerContext
}