import React, { createContext, useState } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const FormDataContext = createContext({})

export const withFormDataContext = (WrappedComponent, defaultValues={}) => {
    const WithFormDataContext = (props) => {
        const [state, setState] = useState({
            isLoading: false,
            isReloadingData: false,
            payload: {},
            params: {},
            lastFormValuesSnapshot: {},
            ...defaultValues,
        })

        const value = {
            ...state,
            disableReloadData: (newValue) => setState((oldState) => ({...oldState, isReloadingData: false})),
            enableReloadData: (newValue) => setState((oldState) => ({...oldState, isReloadingData: true})),
            setSnapshot: (newValue) => setState((oldState) => ({...oldState, lastFormValuesSnapshot: newValue})),
            setPayload: (newValue) => setState((oldState) => ({...oldState, payload: newValue})),
            setParams: (newValue) => setState((oldState) => ({...oldState, params: { ...oldState.params, ...newValue }})),
            enableLoading: (newValue) => setState((oldState) => ({...oldState, isLoading: true})),
            disableLoading: (newValue) => setState((oldState) => ({...oldState, isLoading: false})),
        }

        return (
            <FormDataContext.Provider value={value}>
                <WrappedComponent {...props} />
            </FormDataContext.Provider>
        )
    }

    hoistNonReactStatic(WithFormDataContext, WrappedComponent)

    WithFormDataContext.displayName = `WithFormDataContext(${getDisplayName(WrappedComponent)})`

    return WithFormDataContext
}