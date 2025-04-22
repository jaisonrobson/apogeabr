import React, { useState, Fragment, useEffect } from 'react'

import {
    ConnectedPagination,
    Table,
    Row,
    Col,
    ElasticSearchInput,
    ConnectedPaginatedTable,
    RecordForm,
} from 'components'

const SearchableFormConnectedPaginatedTable = ({
    searchEndpoint,
    endpoint,
    children,
    formChildren,
    light = false,
    additionalAllowedProperties = () => ({}),
    additionalValidations = () => ({}),
    formProps={},
    searchProps={},
    tableProps={}
}) => {
    const [tablePayload, setTablePayload] = useState({})
    const [allowedProperties, setAllowedProperties] = useState({})
    const [validations, setValidations] = useState({})

    const handleFormData = (data) => setTablePayload(data)

    useEffect(() => {
        setAllowedProperties(additionalAllowedProperties(tablePayload))
        setValidations(additionalValidations(tablePayload))
    }, [tablePayload])

    return (
        <RecordForm
            fontFamily="Celtic Garamond the 2nd"
            additionalAllowedProperties={allowedProperties}
            additionalValidations={validations}
            {...formProps}
        >
            {(formChildrenAsProps) => (
                <Fragment>
                    <ElasticSearchInput
                        inputProps={{ light }}
                        containersStyles={[{}, {}, {}, {
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }]}
                        searchEndpoint={searchEndpoint}
                        {...searchProps}
                    >
                        {({ query, loading: isLoadingElasticSearch, finalEndpointUrl }) => (
                            <ConnectedPaginatedTable
                                light={light}
                                endpoint={endpoint}
                                overwritedEndpoint={finalEndpointUrl}
                                onRefresh={handleFormData}
                                {...tableProps}
                            >
                                {({ payload, isLoading: isLoadingPaginationTable, headerCount }) => (
                                    children({
                                        payload,
                                        isLoadingElasticSearch,
                                        isLoadingPaginationTable,
                                        headerCount,
                                        ...formChildrenAsProps
                                    })
                                )}
                            </ConnectedPaginatedTable>
                        )}
                    </ElasticSearchInput>

                    {formChildren && formChildren(formChildrenAsProps)}
                </Fragment>
            )}
        </RecordForm>
    )
}

SearchableFormConnectedPaginatedTable.SubmitButton = RecordForm.SubmitButton
SearchableFormConnectedPaginatedTable.SubmissionInfo = RecordForm.SubmissionInfo

export default SearchableFormConnectedPaginatedTable