import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

import { Pagination, DropdownInput } from 'components'

import { DefaultPaginationContext } from 'contexts'

const PerPageDropdown = ({
    context = DefaultPaginationContext,
    endpoint,
    options = [5, 10, 15, 20, 25, 35, 50],
    ...props
}) => {
    const {
        isLoading,
        page,
        setPage,
        setPerPage,
        setTotalPages,
        setPayload,
        enableLoading,
        disableLoading,
    } = useContext(context)

    const onSelect = async (fakeParamOne, value, fakeParamThree) => {
        setPerPage(options[value])

        enableLoading()

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    page: 1,
                    per_page: options[value],
                },
            })

            if (!_.isEmpty(response.data)) {
                setPage(response.data.pagination.current_page)
                setTotalPages(response.data.pagination.total_pages)
                setPayload(response.data.payload)
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
                height:"28px",
                width:"100%",
                minWidth:"300px",
            }}
            setValue={onSelect}
            options={options}
            {...props}
        />
    )
}

const ConnectedPagination = ({ context = DefaultPaginationContext, endpoint, maxNavigationalPagesPerDirection = 3, ...props }) => {
    const {
        payload,
        page,
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
                const response = await axios.get(endpoint, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    params: {
                        page,
                        per_page: perPage,
                    },
                })
    
                if (!_.isEmpty(response.data)) {
                    setPage(response.data.pagination.current_page)
                    setTotalPages(response.data.pagination.total_pages)
                    setPayload(response.data.payload)
                }
            } catch (error) {
                console.error("Erro:", error)
            } finally {
                disableLoading()
            }
        }

        initialize()
    }, [])    

    const onNavigate = async (toPage) => {
        enableLoading()

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    page: toPage,
                    per_page: perPage,
                },
            })

            if (!_.isEmpty(response.data)) {
                setPage(response.data.pagination.current_page)
                setPayload(response.data.payload)
            }
        } catch (error) {
            console.error("Erro:", error)
        } finally {
            disableLoading()
        }
    }

    return (
        <Pagination {...props}>
            <Pagination.Item disabled={page === 1}>
                <Pagination.Link first onClick={() => onNavigate(1)} />
            </Pagination.Item>

            <Pagination.Item disabled={page === 1}>
                <Pagination.Link previous onClick={() => onNavigate(page - 1)} />
            </Pagination.Item>

            {_.times(maxNavigationalPagesPerDirection, (pageNumber) => (
                (page - (pageNumber+1) > 0)
                    ? (
                        <Pagination.Item key={page - (pageNumber+1)}>
                            <Pagination.Link onClick={() => onNavigate((page - (pageNumber+1)))}>
                                {page - (pageNumber+1)}
                            </Pagination.Link>
                        </Pagination.Item>
                    )
                    : null
            )).reverse()}

            <Pagination.Item className="active" disabled={true}>
                <Pagination.Link>
                    {page}
                </Pagination.Link>
            </Pagination.Item>

            {_.times(maxNavigationalPagesPerDirection, (pageNumber) => (
                (page + (pageNumber+1) <= totalPages)
                    ? (
                        <Pagination.Item key={page + (pageNumber+1)}>
                            <Pagination.Link onClick={() => onNavigate((page + (pageNumber+1)))}>
                                {page + (pageNumber+1)}
                            </Pagination.Link>
                        </Pagination.Item>
                    )
                    : null
            ))}

            <Pagination.Item disabled={page === totalPages}>
                <Pagination.Link next onClick={() => onNavigate(page + 1)} />
            </Pagination.Item>

            <Pagination.Item disabled={page === totalPages}>
                <Pagination.Link last onClick={() => onNavigate(totalPages)} />
            </Pagination.Item>
        </Pagination>
    )
}

ConnectedPagination.PerPageDropdown = PerPageDropdown

export default ConnectedPagination