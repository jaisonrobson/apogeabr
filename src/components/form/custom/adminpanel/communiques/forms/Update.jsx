import React, { Fragment } from 'react'
import z from 'zod'
import _ from 'lodash'

import { faPen } from '@fortawesome/free-solid-svg-icons'

import {
    extractValuesByExactKeyNameIntoArray,
    extractIntoFlatObjectFieldsByName,
    extractFromNestedObjectByFilters,
} from 'util/json'

import {
    alphabeticThreeHundredStringValidation,
    alphabeticFiveHundredStringValidation,
    idValidation,
} from 'validations'

import ROUTES from 'router/routes'

import {
    Button, 
    Icon,
    CommuniqueFormInputs,
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

const Update = ({ communique }) => (
    <RecordFormModal
        title="Atualizar Comunicado"
        modalComponent={EditRecordButton}
        doFormLateLoadInformations={true}
        formComponentProps={({ dynamicFields, isOpen, fetchingPayload }) => ({
            action: ROUTES.USER_ADMIN_PANEL_COMMUNIQUES_UPDATE_SUBMIT.path,
            onlyTouchedFields: true,
            externalSchema: z.object({
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                    maxDepth: 4
                }),
            }),
            validationSchema: z.object({}),
            defaultValues: {},
            lateLoadingProps: { isOpen },
            lateLoadingTriggers: [{ isOpen: true }],
            lateLoadingValues: () => ({
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
                    maxDepth: 4,
                }),
            }),
            additionalSubmitValues: ({
                id: communique.id,
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
                    maxDepth: 4,
                }),
            }),
            additionalAllowedProperties: [
                ...extractValuesByExactKeyNameIntoArray(dynamicFields, "name", 4),
                "persisted",
                "non_persisted",
                "id",
            ],
            additionalEnforcedProperties: ["id"]
        })}
        inputsComponent={CommuniqueFormInputs}
        inputsComponentExtraProps={{
            communique: communique,
        }}
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
                actionRoute: `communiques/${communique.id}/translations`,
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route,
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => ({ locales: data.payload }),
            (data) => {
                const existingModelIds = _.uniq(_.map(data.payload, 'communique_id'))
                const existingLocaleIds = _.map(data.payload, 'locale_id')
                const missingLocales = _.filter(data.accumulatedPayload.locales, locale => !existingLocaleIds.includes(locale.id))
                const newRecords = _.flatMap(existingModelIds, modelIdIteratee => _.map(missingLocales, locale => ({
                    communique_id: modelIdIteratee,
                    locale_id: locale.id,
                    title: "",
                    content: "",
                    composite_id: `${modelIdIteratee}-${locale.id}`,
                    locale: locale,
                    isPersistedRecord: false,
                })))
                const result = _.concat(data.payload, newRecords)
                return ({ ...result })
            }
        ]}
        fetchingDynamicFieldsHelper={(collective) => ({
            [`DIFY_collective_${collective.locale_id}`]: {
                collectiveName: collective.locale.name,
                [`DIFY_locale_id_${collective.locale_id}`]: {
                    type: undefined,
                    label: '',
                    name: `locale_id_DIFY_${collective.locale_id}`,
                    value: collective.locale_id,
                    validation: undefined,
                    isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                },
                [`DIFY_title_${collective.locale_id}`]: {
                    type: 'text',
                    name: `title_DIFY_${collective.locale_id}`,
                    label: 'Título:',
                    value: collective.title || '',
                    validation: _.isEmpty(collective.title) ? alphabeticThreeHundredStringValidation : alphabeticThreeHundredStringValidation.optional(),
                    isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                },
                [`DIFY_content_${collective.locale_id}`]: {
                    type: 'textarea',
                    name: `content_DIFY_${collective.locale_id}`,
                    label: 'Conteúdo:',
                    value: collective.content || '',
                    validation: _.isEmpty(collective.content) ? alphabeticFiveHundredStringValidation : alphabeticFiveHundredStringValidation.optional(),
                    isPersistedRecord: collective?.isPersistedRecord === false ? collective?.isPersistedRecord : true,
                },
            },
        })}
        light={true}
    />
)

export default Update 