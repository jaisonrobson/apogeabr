import React from 'react'
import z from 'zod'

import {
    extractIntoFlatObjectFieldsByName,
    extractValuesByExactKeyNameIntoArray,
} from 'util/json'

import {
    nonNegativeInfiniteFloatNumber,
    nonNegativeInfiniteIntegerNumber,
    idValidation,
    twoMegabytesImageValidation,
    alphabeticThreeHundredStringValidation,
    alphabeticFiveHundredStringValidation,
} from 'validations'

import ROUTES from 'router/routes'

import {
    Icon,
    Table,
    Div,
    ItemFormInputs,
    RecordFormModal,
} from 'components'

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

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
        title="Novo Item"
        modalComponent={AddRecordTableCell}
        modalComponentProps={{ headerCount }}
        formComponentProps={({ dynamicFields, isOpen, fetchingPayload}) => ({
            action: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS_CREATE_SUBMIT.path,
            defaultValues: {
                image: null,
                item_category_id: 0,
                maxstack: 1,
                weight: 0,
                armor: 0,
                damage: 0,
                attackspeed: 0,
                range: 0,
                defense: 0,
                size: 0,
                slots: 0,
            },
            additionalValidations: ({
                image: twoMegabytesImageValidation,
                item_category_id: idValidation,
                maxstack: nonNegativeInfiniteIntegerNumber,
                weight: nonNegativeInfiniteFloatNumber,
                armor: nonNegativeInfiniteIntegerNumber,
                damage: nonNegativeInfiniteIntegerNumber,
                attackspeed: nonNegativeInfiniteIntegerNumber,
                range: nonNegativeInfiniteIntegerNumber,
                defense: nonNegativeInfiniteIntegerNumber,
                size: nonNegativeInfiniteIntegerNumber,
                slots: nonNegativeInfiniteIntegerNumber,
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
                "item_category_id",
                "maxstack",
                "weight",
                "armor",
                "damage",
                "attackspeed",
                "range",
                "defense",
                "size",
                "slots",
            ],
        })}
        inputsComponent={ItemFormInputs}
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
        fetchingDynamicFieldsHelper={(collective) => ({
            [`DIFY_collective_${collective.id}`]: {
                collectiveName: collective.name,
                [`DIFY_locale_id_${collective.id}`]: {
                    type: undefined,
                    label: '',
                    name: `locale_id_DIFY_${collective.id}`,
                    value: collective.id,
                    validation: undefined,
                },
                [`DIFY_name_${collective.id}`]: {
                    type: 'text',
                    name: `name_DIFY_${collective.id}`,
                    label: 'Nome:',
                    value: '',
                    validation: alphabeticThreeHundredStringValidation,
                },
                [`DIFY_description_${collective.id}`]: {
                    type: 'textarea',
                    name: `description_DIFY_${collective.id}`,
                    label: 'Descrição:',
                    value: '',
                    validation: alphabeticFiveHundredStringValidation,
                },
                [`DIFY_attributesinfo_${collective.id}`]: {
                    type: 'textarea',
                    name: `attributesinfo_DIFY_${collective.id}`,
                    label: 'Informações de Atributos:',
                    value: '',
                    validation: alphabeticFiveHundredStringValidation,
                },
                [`DIFY_notes_${collective.id}`]: {
                    type: 'textarea',
                    name: `notes_DIFY_${collective.id}`,
                    label: 'Notas:',
                    value: '',
                    validation: alphabeticFiveHundredStringValidation,
                },
            },
        })}
        light={true}
    />
)

export default Create 