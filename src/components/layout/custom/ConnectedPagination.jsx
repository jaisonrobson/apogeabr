import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

import { Pagination, DropdownInput } from 'components'

import { DefaultPaginationContext } from 'contexts'

const PerPageDropdown = ({
    context = DefaultPaginationContext,
    endpoint,
    overwritedEndpoint = "",
    containerStyle,
    togglerProperties,
    options = [
        {id: 5, name: 5},
        {id: 10, name: 10},
        {id: 15, name: 15},
        {id: 20, name: 20},
        {id: 25, name: 25},
        {id: 35, name: 35},
        {id: 50, name: 50}
    ],
    onRefresh = () => {},
    ...props
}) => {
    const {
        isLoading,
        page,
        params,
        setPage,
        setPerPage,
        setTotalPages,
        setPayload,
        enableLoading,
        disableLoading,
    } = useContext(context)

    const onSelect = async (fakeParamOne, value, fakeParamThree) => {
        setPerPage(value)

        enableLoading()

        try {
            const currentEndpoint = overwritedEndpoint || endpoint

            const response = await axios.get(currentEndpoint, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    page: 1,
                    per_page: value,
                    ...params,
                },
            })

            if (!_.isEmpty(response.data)) {
                setPage(response.data.pagination.current_page)
                setTotalPages(response.data.pagination.total_pages)
                setPayload(response.data.payload)
                onRefresh(response.data.payload)
            }
        } catch (error) {
            console.error("Erro:", error)
        } finally {
            disableLoading()
        }
    }

    return (
        <DropdownInput
            containerStyle={{
                maxHeight: '38px',
                width: '100px',
                minWidth:"200px",
                ...containerStyle,
            }}
            togglerProperties={{
                height:"38px",
                maxHeight: '38px',
                fontSize: '14px',
                ...togglerProperties,
            }}
            setValue={onSelect}
            options={options}
            defaultValue={_.first(options).id}
            {...props}
        />
    )
}

const ConnectedPagination = ({
    context = DefaultPaginationContext,
    endpoint,
    overwritedEndpoint = "",
    themeItemProps={light: false},
    themeLinkProps={light: false},
    maxNavigationalPagesPerDirection = 3,
    onRefresh = () => {},
    ...props
}) => {
    const {
        payload,
        page,
        params,
        perPage,
        totalPages,
        setPage,
        setTotalPages,
        setPayload,
        enableLoading,
        disableLoading,
    } = useContext(context)

    useEffect(() => {
        const initialize = async () => {
            enableLoading()
    
            try {
                const currentEndpoint = overwritedEndpoint || endpoint

                const response = await axios.get(currentEndpoint, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    params: {
                        page,
                        per_page: perPage,
                        ...params,
                    },
                })
    
                if (!_.isEmpty(response.data)) {
                    setPage(response.data.pagination.current_page)
                    setTotalPages(response.data.pagination.total_pages)
                    setPayload(response.data.payload)
                    onRefresh(response.data.payload)
                }
            } catch (error) {
                console.error("Erro:", error)
            } finally {
                disableLoading()
            }
        }

        initialize()
    }, [params, overwritedEndpoint, endpoint])

    const onNavigate = async (toPage) => {
        enableLoading()

        try {
            const currentEndpoint = overwritedEndpoint || endpoint

            const response = await axios.get(currentEndpoint, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    page: toPage,
                    per_page: perPage,
                    ...params,
                },
            })

            if (!_.isEmpty(response.data)) {
                setPage(response.data.pagination.current_page)
                setTotalPages(response.data.pagination.total_pages)
                setPayload(response.data.payload)
                onRefresh(response.data.payload)
            }
        } catch (error) {
            console.error("Erro:", error)
        } finally {
            disableLoading()
        }
    }

    return (
        <Pagination {...props}>
            <Pagination.Item {...themeItemProps} disabled={page === 1}>
                <Pagination.Link {...themeLinkProps} first onClick={() => onNavigate(1)} />
            </Pagination.Item>

            <Pagination.Item {...themeItemProps} disabled={page === 1}>
                <Pagination.Link {...themeLinkProps} previous onClick={() => onNavigate(page - 1)} />
            </Pagination.Item>

            {_.times(maxNavigationalPagesPerDirection, (pageNumber) => (
                (page - (pageNumber+1) > 0)
                    ? (
                        <Pagination.Item {...themeItemProps} key={page - (pageNumber+1)}>
                            <Pagination.Link {...themeLinkProps} onClick={() => onNavigate((page - (pageNumber+1)))}>
                                {page - (pageNumber+1)}
                            </Pagination.Link>
                        </Pagination.Item>
                    )
                    : null
            )).reverse()}

            <Pagination.Item {...themeItemProps} className="active" disabled={true}>
                <Pagination.Link {...themeLinkProps}>
                    {page}
                </Pagination.Link>
            </Pagination.Item>

            {_.times(maxNavigationalPagesPerDirection, (pageNumber) => (
                (page + (pageNumber+1) <= totalPages)
                    ? (
                        <Pagination.Item {...themeItemProps} key={page + (pageNumber+1)}>
                            <Pagination.Link {...themeLinkProps} onClick={() => onNavigate((page + (pageNumber+1)))}>
                                {page + (pageNumber+1)}
                            </Pagination.Link>
                        </Pagination.Item>
                    )
                    : null
            ))}

            <Pagination.Item {...themeItemProps} disabled={page === totalPages}>
                <Pagination.Link {...themeLinkProps} next onClick={() => onNavigate(page + 1)} />
            </Pagination.Item>

            <Pagination.Item {...themeItemProps} disabled={page === totalPages}>
                <Pagination.Link {...themeLinkProps} last onClick={() => onNavigate(totalPages)} />
            </Pagination.Item>
        </Pagination>
    )
}

ConnectedPagination.PerPageDropdown = PerPageDropdown

export default ConnectedPagination