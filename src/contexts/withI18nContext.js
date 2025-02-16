import React, { createContext, useState, useContext } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import { getDisplayName } from 'util/hoc'

import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enUSTranslations from 'locales/en-US/translation.json'
import ptBRTranslations from 'locales/pt-BR/translation.json'

i18n
  .use(LanguageDetector) // Detectar idioma do navegador
  .use(initReactI18next) // Integrar com React
  .init({
    resources: {
      "en-US": {
        translation: enUSTranslations,
      },
      "pt-BR": {
        translation: ptBRTranslations,
      },
    },
    fallbackLng: 'en-US',
    debug: true,
    interpolation: { escapeValue: false },
  })

export const I18nContext = createContext({})

export const withI18nContext = (WrappedComponent, defaultValues={}) => {
    const WithI18nContext = (props) => {
        const { t, i18n } = useTranslation()

        const [state, setState] = useState({
            locale: "pt-BR",
            currency: "BRL",
            ...defaultValues,
        })

        const setLanguage = (language) => i18n.changeLanguage(language)

        const formatDateTime = (date) => new Intl.DateTimeFormat(
          state.locale,
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }
        ).format(new Date(date))

        const formatDate = (date) => new Intl.DateTimeFormat(state.locale).format(new Date(date))
        
        const formatNumber = (number) => new Intl.NumberFormat(state.locale).format(number)
        
        const formatCurrency = (value) => 
            new Intl.NumberFormat(state.locale, {
              style: "currency",
              currency: state.currency,
            }).format(value)

        const value = {
            ...state,
            setLocale: (newValue) => setState((oldState) => ({...oldState, locale: newValue})),
            setCurrency: (newValue) => setState((oldState) => ({...oldState, currency: newValue})),
            formatDate,
            formatDateTime,
            formatNumber,
            formatCurrency,
            setLanguage,
            translate: t,
        }

        return (
            <I18nContext.Provider value={value}>
                <WrappedComponent {...props} />
            </I18nContext.Provider>
        )
    }

    hoistNonReactStatic(WithI18nContext, WrappedComponent)

    WithI18nContext.displayName = `WithI18nContext(${getDisplayName(WrappedComponent)})`

    return WithI18nContext
}