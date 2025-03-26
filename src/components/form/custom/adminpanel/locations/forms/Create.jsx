import React, { Fragment, useEffect, useState } from 'react'
import _ from 'lodash'

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import { extractValuesByExactKeyNameIntoArray, extractIntoFlatObjectFieldsByName } from 'util/json'

import {
    alphabeticThreeHundredStringValidation,
    alphabeticFiveHundredStringValidation,
    booleanValidation,
    idValidation,
    inGameMapCoordinatesValidation,
    websiteMapCoordinatesValidation,
    twoMegabytesImageValidation,
} from 'validations'

import {
    Icon,
    Table,
    Div,
    LocationFormInputs,
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
        title="Novo Local"
        modalComponent={AddRecordTableCell}
        modalComponentProps={{ headerCount }}
        formComponentProps={({ dynamicFields, isOpen, fetchingPayload}) => ({
            action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LOCATIONS_CREATE_SUBMIT.path,
            defaultValues: {
                image: null,
                icon_id: 0,
                iscity: 0,
                webx: 0,
                weby: 0,
                webz: 0,
                x: 0,
                y: 0,
                z: 0,
            },
            additionalValidations: ({
                image: twoMegabytesImageValidation.optional(),
                icon_id: idValidation.optional(),
                iscity: booleanValidation.optional(),
                webx: websiteMapCoordinatesValidation.optional(),
                weby: websiteMapCoordinatesValidation.optional(),
                webz: websiteMapCoordinatesValidation.optional(),
                x: inGameMapCoordinatesValidation.optional(),
                y: inGameMapCoordinatesValidation.optional(),
                z: inGameMapCoordinatesValidation.optional(),
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
                "image",
                "icon_id",
                "iscity",
                "webx",
                "weby",
                "webz",
                "x",
                "y",
                "z",
            ],
        })}
        inputsComponent={LocationFormInputs}
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
                [`DIFY_description_${locale.id}`]: {
                    type: 'textarea',
                    name: `description_DIFY_${locale.id}`,
                    label: 'Descrição:',
                    value: locale.description,
                    validation: alphabeticFiveHundredStringValidation,
                },
            },
        })}
        light={true}
    />
)

export default Create