import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { loadAction } from 'util/axios'

import { Dropdown, Span, Icon, Input, Image } from 'components'

import noImage from 'images/layout/generic/noImage.png'

const ElasticSearchDropdown = ({
    defaultValueFetchEndpoint,
    defaultValueResponsePayloadPath,
    togglerProperties = {},
    searchEndpoint = "",
    searchPayloadIdPath = ["id"],
    searchPayloadNamePath = ["name"],
    searchPayloadImagePath = ["image"],
    forbiddenEndpoint = "",
    fieldNamingLenght = 32,
    menuProperties = {},
    itemProperties = {},
    inputProps = {},
    defaultValue = { id: 0, name: "Busque uma opção" },
    onChange = () => {},
    value,
    light = false,
    ...props
}) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const getHeaders = () => {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json'
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        return headers
    }

    useEffect(() => {
        if (value) {
            const fetchInformation = async (id) => {
                try {
                    const result = await loadAction({
                        actionMethod: "GET",
                        actionRoute: `${defaultValueFetchEndpoint}/${id}`,
                        responsePayloadPath: defaultValueResponsePayloadPath,
                    })

                    setSelectedOption(result?.payload ? result.payload : defaultValue)
                } catch (error) {
                    console.error("Erro ao buscar informação padrão:", error)
                    setSelectedOption(defaultValue)
                }
            }

            fetchInformation(value)
        }
    }, [value])

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return
        }

        const fetchResults = async () => {
            setLoading(true)

            try {
                let response = await axios.request({
                    url: `${searchEndpoint}?query=${query}`,
                    method: 'GET',
                    headers: getHeaders()
                })

                if (!_.isEmpty(forbiddenEndpoint)) {
                    try {
                        const forbiddenResponse = await axios.request({
                            url: forbiddenEndpoint,
                            method: 'GET',
                            headers: getHeaders()
                        })

                        const forbiddenIds = forbiddenResponse.data.payload
                        const isForbidden = (obj) => forbiddenIds.includes(_.get(obj, searchPayloadIdPath))

                        const filteredResults = _.filter(response.data.payload, (item) => !isForbidden(item))
                        response.data.payload = filteredResults
                    } catch (error) {
                        console.error("Erro ao buscar endpoints proibidos:", error)
                        // Se falhar ao buscar endpoints proibidos, continua com todos os resultados
                    }
                }

                setResults(response.data.payload)
            } catch (error) {
                console.error("Erro ao buscar registros:", error)
                setResults([])
            }

            setLoading(false)
        }

        const delayDebounce = setTimeout(() => {
            if (query) {
                fetchResults()
            }
        }, 1000)

        return () => clearTimeout(delayDebounce)
    }, [query])

    const handleSelect = (value) => {
        const selectedId = _.get(value, searchPayloadIdPath)
        onChange(selectedId)
        setSelectedOption(value)
        setQuery("")
        setResults([])
    }

    return (
        <Dropdown light={light} {...props}>
            <Dropdown.Toggler
                width="100%"
                fontSize="12px"
                componentColor="none"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-around"
                light={light}
                {...togglerProperties}
            >
                <Span>{_.get(selectedOption, searchPayloadNamePath) || "Busque uma opção..."}</Span>

                <Icon icon={faCaretDown} size="xl" color="inherit" marginTop="-4px" />
            </Dropdown.Toggler>

            <Dropdown.Menu
                light={light}
                className="unselectable"
                style={{ width: '100%' }}
                {...menuProperties}
            >
                <Dropdown.Item
                    toggle={false}
                    onClick={(e) => e.preventDefault()}
                >
                    <Input
                        width="100%"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Realizar busca..."
                        {...inputProps}
                    />
                </Dropdown.Item>
                
                {!loading && _.map(results, (option, idx) => (
                    <Dropdown.Item
                        key={_.get(option, searchPayloadIdPath)}
                        light={light}
                        onClick={() => handleSelect(option)}
                        {...itemProperties}
                        display="flex"
                        justifyContent="space-between"
                    >
                        {_.get(option, searchPayloadNamePath).length > fieldNamingLenght ? _.get(option, searchPayloadNamePath).substring(0, fieldNamingLenght) + "..." : _.get(option, searchPayloadNamePath)}

                        <Image
                            src={_.get(option, searchPayloadImagePath) || noImage}
                            className="rounded-circle"
                            objectFit="contain"
                            width="25px"
                            minWidth="25px"
                            maxWidth="25px"
                            height="25px"
                            minHeight="25px"
                            maxHeight="25px"
                        />
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ElasticSearchDropdown 