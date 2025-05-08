import React, { createContext, useState } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const MercadoPagoBricksContext = createContext({})

export const withMercadoPagoBricksContext = (WrappedComponent, defaultValues={}) => {
    const WithMercadoPagoBricksContext = (props) => {
        const [state, setState] = useState({
            isLoading: false,
            payload: {},
            preferenceId: null,
            error: "",
            pixCode: null,
            paymentData: null,
            showStatusScreen: false,
            showPixQRCode: false,
            showPaymentData: false,
            paymentStatus: null,
            endpoint: null,
            amount: 5,
            selectedPaymentMethod: null,
            ...defaultValues,
        })

        const value = {
            ...state,
            setPayload: (newValue) => setState((oldState) => ({...oldState, payload: newValue})),
            setPreferenceId: (newValue) => setState((oldState) => ({...oldState, preferenceId: newValue})),
            setError: (newValue) => setState((oldState) => ({...oldState, error: newValue})),
            setPixCode: (newValue) => setState((oldState) => ({...oldState, pixCode: newValue})),
            setPaymentData: (newValue) => setState((oldState) => ({...oldState, paymentData: newValue})),
            setShowStatusScreen: (newValue) => setState((oldState) => ({...oldState, showStatusScreen: newValue})),
            setShowPixQRCode: (newValue) => setState((oldState) => ({...oldState, showPixQRCode: newValue})),
            setShowPaymentData: (newValue) => setState((oldState) => ({...oldState, showPaymentData: newValue})),
            setPaymentStatus: (newValue) => setState((oldState) => ({...oldState, paymentStatus: newValue})),
            setAmount: (newValue) => setState((oldState) => ({...oldState, amount: newValue})),
            setEndpoint: (newValue) => setState((oldState) => ({...oldState, endpoint: newValue})),
            setSelectedPaymentMethod: (newValue) => setState((oldState) => ({...oldState, selectedPaymentMethod: newValue})),
            enableLoading: (newValue) => setState((oldState) => ({...oldState, isLoading: true})),
            disableLoading: (newValue) => setState((oldState) => ({...oldState, isLoading: false})),
        }

        return (
            <MercadoPagoBricksContext.Provider value={value}>
                <WrappedComponent {...props} />
            </MercadoPagoBricksContext.Provider>
        )
    }

    hoistNonReactStatic(WithMercadoPagoBricksContext, WrappedComponent)

    WithMercadoPagoBricksContext.displayName = `WithMercadoPagoBricksContext(${getDisplayName(WrappedComponent)})`

    return WithMercadoPagoBricksContext
}