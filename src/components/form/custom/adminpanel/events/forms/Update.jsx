import React, { Fragment, useState, useEffect } from 'react'
import z from 'zod'
import _ from 'lodash'

import { faPen } from '@fortawesome/free-solid-svg-icons'

import { urlToFile } from 'util/image'
import { extractValuesByExactKeyNameIntoArray, extractIntoFlatObjectFieldsByName, extractFromNestedObjectByFilters } from 'util/json'

import {
    alphabeticFiveHundredStringValidation,
    alphabeticThreeHundredStringValidation,
    idValidation,
    twoMegabytesImageValidation,
} from 'validations'

import ROUTES from 'router/routes'

import {
    Button, 
    Icon,
    EventFormInputs,
    RecordFormModal,
} from 'components'

const EditRecordButton = ({ animationName = "recordEditAnimation", animatedBackgroundColor = "#FFFA85", ...props }) => (
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

const Update = ({ theEvent }) => (
    <RecordFormModal
        title="Atualizar Evento"
        modalComponent={EditRecordButton}
        doFormLateLoadInformations={true}
        formComponentProps={({ dynamicFields, isOpen, fetchingPayload }) => ({
            action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_EVENTS_UPDATE_SUBMIT.path,
            onlyTouchedFields: true,
            externalSchema: z.object({
                location_id: idValidation.optional(),
                image: twoMegabytesImageValidation.optional(),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                }),
            }),
            validationSchema: z.object({}),
            defaultValues: {
                location_id: 0,
                image: null,
            },
            lateLoadingProps: { isOpen },
            lateLoadingTriggers: [{ isOpen: true }],
            lateLoadingValues: () => ({
                location_id: theEvent.location_id,
                image: theEvent?.image ? urlToFile(theEvent.image) : null,
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
                id: theEvent.id,
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                    byName: "name",
                    fieldName: "value",
                    validateFields: false,
                    validationFunction: (obj) => {
                        if (obj?.name?.includes("id"))
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
            additionalAllowedProperties: [
                ...extractValuesByExactKeyNameIntoArray(dynamicFields),
                "persisted",
                "non_persisted",
                "id",
                "image",
                "location_id",
            ],
            additionalEnforcedProperties: ["id"]
        })}
        inputsComponent={EventFormInputs}
        submitButtonProps={{
            color: "white",
            animationBackgroundColor: "#FFFA85",
            animationName: "recordEditSubmitAnimation",
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
                actionRoute: `events/${theEvent.id}/translations`,
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route,
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => ({ locales: data.payload }),
            (data) => {
                // Encontrar os `ids` únicos existentes na lista de resultado do modelo em questao
                const existingModelIds = _.uniq(_.map(data.payload, 'event_id'))

                // Encontrar os locale_ids já presentes no modelo em questao
                const existingLocaleIds = _.map(data.payload, 'locale_id')

                // Filtrar os idiomas que ainda não estão no ícone
                const missingLocales = _.filter(data.accumulatedPayload.locales, locale => !existingLocaleIds.includes(locale.id))

                // Criar novos objetos vazios para os ids ausentes e adicionar à lista
                const newRecords = _.flatMap(existingModelIds, modelIdIteratee => _.map(missingLocales, locale => ({
                    event_id: modelIdIteratee,
                    locale_id: locale.id,
                    name: "",
                    description: "",
                    composite_id: `${modelIdIteratee}-${locale.id}`,
                    locale: locale,
                    isPersistedRecord: false,
                }))
                )

                // Atualizar a lista de resultado do modelo em questao com os novos registros
                const result = _.concat(data.payload, newRecords)

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
                    validation: _.isEmpty(collective.name) ? alphabeticThreeHundredStringValidation : alphabeticThreeHundredStringValidation.optional(),
                    isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                },
                [`DIFY_description_${collective.locale_id}`]: {
                    type: 'textarea',
                    name: `description_DIFY_${collective.locale_id}`,
                    label: 'Descrição:',
                    value: collective.description,
                    validation: _.isEmpty(collective.description) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                    isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                },
            },
        })}
        light={true} />
)

export default Update