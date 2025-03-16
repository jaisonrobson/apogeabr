import React, { Fragment, useState, useEffect } from 'react'
import z from 'zod'
import _ from 'lodash'

import { faPen } from '@fortawesome/free-solid-svg-icons'

import { urlToFile } from 'util/image'
import { extractIntoFlatArrayFieldByName, extractIntoFlatObjectFieldsByName, extractFromNestedObjectByFilters } from 'util/json'
import { alphabeticThreeHundredString, twoMegabytesImageValidation } from 'validations'

import ROUTES from 'router/routes'

import {
    Button, 
    Icon,
    IconFormInputs,
    RecordFormModal,
} from 'components'

const EditRecordButton = ({ animationName = "iconEditAnimation", animatedBackgroundColor = "#FFFA85", ...props }) => (
    <Button
        color="white"
        backgroundColor='#00000060'
        border='2px solid gray'
        onHover={{
            animation: {
                property: `${animationName} 0.5s linear 0s infinite alternate`,
                corpse: `@keyframes ${animationName} {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: ${animatedBackgroundColor}; border-radius: 8px}
                }`
            }
        }}
        {...props}
    >
        <Icon icon={faPen} />
    </Button>
)

const Update = ({ icon }) => (
    <RecordFormModal
        title="Atualizar Ícone"
        modalComponent={EditRecordButton}
        formComponentProps={({ dynamicFields, isOpen, fetchingPayload}) => ({
            action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS_UPDATE_SUBMIT.path,
            onlyTouchedFields: true,
            externalSchema: z.object({
                image: twoMegabytesImageValidation.optional(),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                }),
            }),
            validationSchema: z.object({}),
            defaultValues: {
                image: null,
            },
            lateLoadingProps: { isOpen },
            lateLoadingTriggers: [{ isOpen: true }],
            lateLoadingValues: () => ({
                image: urlToFile(icon.image),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                    byName: "name",
                    fieldName: "value",
                    validateFields: false,
                    validationFunction: (obj) => {
                        if (obj.type !== undefined)
                            return true
                        return false
                    },
                }),
            }),
            additionalSubmitValues: ({
                id: icon.id,
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                    byName: "name",
                    fieldName: "value",
                    validateFields: false,
                    validationFunction: (obj) => {
                        if (obj.name.includes("id"))
                            return true
                        return false
                    },
                }),
                ...extractFromNestedObjectByFilters({
                    initialData: dynamicFields,
                    filters: [
                        (field) => field.isPersistedRecord === true,
                        (field) => field.isPersistedRecord === false
                    ],
                    filtersNamings: [
                        "persisted",
                        "non_persisted"
                    ],
                    comparisonField: 'name',
                }),
            }),
            additionalAllowedProperties: [...extractIntoFlatArrayFieldByName(dynamicFields), "persisted", "non_persisted", "id", "image"],
            additionalEnforcedProperties: ["id"]
        })}
        inputsComponent={IconFormInputs}
        submitButtonProps={{
            color: "white",
            animationBackgroundColor: "#FFFA85",
            animationName: "iconEditSubmitAnimation",
            value: "Alterar",
        }}
        fetchDynamicFields={true}
        fetchingRequests={[
            {
                actionMethod: "GET",
                actionRoute: `locales/all/*`,
            },
            {
                actionMethod: "GET",
                actionRoute: `icons/${icon.id}/translations`,
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route,
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => ({ locales: data.payload }),
            (data) => {
                // Encontrar os `icon_id` únicos existentes na lista de ícones
                const existingIconIds = _.uniq(_.map(data.payload, 'icon_id'))

                // Encontrar os locale_ids já presentes nos ícones
                const existingLocaleIds = _.map(data.payload, 'locale_id')

                // Filtrar os idiomas que ainda não estão no ícone
                const missingLocales = _.filter(data.accumulatedPayload.locales, locale => !existingLocaleIds.includes(locale.id))

                // Criar novos objetos vazios para os ids ausentes e adicionar à lista
                const newIcons = _.flatMap(existingIconIds, iconIdIteratee => _.map(missingLocales, locale => ({
                    icon_id: iconIdIteratee,
                    locale_id: locale.id,
                    name: "",
                    composite_id: `${iconIdIteratee}-${locale.id}`,
                    locale: locale,
                    isPersistedRecord: false,
                }))
                )

                // Atualizar a lista de ícones com os novos registros
                const result = _.concat(data.payload, newIcons)

                return ({ ...result })
            }
        ]}
        fetchingDynamicFieldsHelper={(collective) => ({
            [`DIFY_collective_${collective.composite_id}`]: {
                collectiveName: collective.locale.name,
                [`DIFY_locale_id_${collective.locale_id}`]: {
                    type: undefined,
                    label: '',
                    name: `locale_id_DIFY_${collective.locale_id}`,
                    value: collective.locale_id,
                    validation: undefined,
                    isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                },
                [`DIFY_name_${collective.locale_id}`]: {
                    type: 'text',
                    name: `name_DIFY_${collective.locale_id}`,
                    label: 'Nome:',
                    value: collective.name,
                    validation: _.isEmpty(collective.name) ? alphabeticThreeHundredString : alphabeticThreeHundredString.optional(),
                    isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                },
            },
        })}
        light={true}
    />
)

export default Update