import React, { useContext, useRef, useState, useEffect } from 'react'

import {
    ConnectedPagination,
    Table,
    Row,
    Col,
    ElasticSearchInput,
    ConnectedPaginatedTable,
} from 'components'

const SearchableConnectedPaginatedTable = ({
    searchEndpoint,
    endpoint,
    children,
    light = false,
    searchProps={},
    tableProps={},
    ...props
}) => (
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
                {...tableProps}
            >
                {({ payload, isLoading: isLoadingPaginationTable, headerCount }) => (
                    children({
                        payload,
                        isLoadingElasticSearch,
                        isLoadingPaginationTable,
                        headerCount,
                    })
                )}
            </ConnectedPaginatedTable>
        )}
    </ElasticSearchInput>
)

export default SearchableConnectedPaginatedTable