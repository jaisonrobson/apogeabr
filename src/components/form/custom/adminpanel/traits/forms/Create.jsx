import React, { Fragment, useEffect, useState } from 'react'
import _ from 'lodash'

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import { extractValuesByExactKeyNameIntoArray, extractIntoFlatObjectFieldsByName } from 'util/json'

import {
    alphabeticThreeHundredStringValidation,
    alphabeticFiveHundredStringValidation,
    nonNegativeInfiniteIntegerNumber,
    idValidation,
} from 'validations'

import {
    Icon,
    Table,
    Div,
    TraitFormInputs,
    RecordFormModal,
} from 'components'

const AddRecordTableCell = ({ headerCount, ...props }) => (
    <Table.Cell
        onHover={{
            backgroundColor: "lightblue",
        }}
        colSpan={headerCount}
        childrenAsFunction
        {...props}
    >
        {({ isHovered }) => (
            <Div
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="15px"                                                                    
            >
                <Icon
                    icon={faSquarePlus}
                    color={isHovered ? "black" : "white"}
                />

                Adicionar novo registro
            </Div>
        )}
    </Table.Cell>
)

const Create = ({ headerCount }) => (
    <RecordFormModal
        title="Nova Característica"
        modalComponent={AddRecordTableCell}
        modalComponentProps={{ headerCount }}
        formComponentProps={({ dynamicFields, isOpen, fetchingPayload}) => ({
            action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS_CREATE_SUBMIT.path,
            defaultValues: {
                icon_id: 0,
                slots: 0,
            },
            additionalValidations: ({
                icon_id: idValidation.optional(),
                slots: nonNegativeInfiniteIntegerNumber.optional(),
                ...extractIntoFlatObjectFieldsByName({
                    initialData: dynamicFields,
                }),
            }),
            additionalSubmitValues: ({
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
            }),
            additionalAllowedProperties: [
                ...extractValuesByExactKeyNameIntoArray(dynamicFields),
                "icon_id",
                "slots",
            ],
        })}
        inputsComponent={TraitFormInputs}
        submitButtonProps={{
            color: "white",
            animationBackgroundColor: "lightblue",
            animationName: "recordCreationSubmitAnimation",
        }}
        fetchDynamicFields={true}
        fetchingRequests={[
            {
                actionMethod: "GET",
                actionRoute: `locales/all/*`,
            }
        ]}
        fetchingRequestHelpers={[
            (data) => data.route
        ]}
        fetchingPayloadHelpers={[
            (data) => (data.payload)
        ]}
        fetchingDynamicFieldsHelper={(locale) => ({
            [`DIFY_collective_${locale.id}`]: {
                collectiveName: locale.name,
                [`DIFY_locale_id_${locale.id}`]: {
                    type: undefined,
                    label: '',
                    name: `locale_id_DIFY_${locale.id}`,
                    value: locale.id,
                    validation: undefined,
                },
                [`DIFY_name_${locale.id}`]: {
                    type: 'text',
                    name: `name_DIFY_${locale.id}`,
                    label: 'Nome:',
                    value: locale.name,
                    validation: alphabeticThreeHundredStringValidation,
                },
                [`DIFY_effect_${locale.id}`]: {
                    type: 'textarea',
                    name: `effect_DIFY_${locale.id}`,
                    label: 'Efeito:',
                    value: locale.effect,
                    validation: alphabeticFiveHundredStringValidation,
                },
            },
        })}
        light={true}
    />
)

export default Create