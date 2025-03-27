import React, { useState, useEffect } from 'react'
import { useFormContext } from "react-hook-form"
import axios from 'axios'
import _ from 'lodash'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { loadAction } from 'util/axios'

import { Dropdown, Span, Icon, Input, Image } from 'components'

import noImage from 'images/layout/generic/noImage.png'

const ElasticSearchDropdownInput = ({
    doFormLateLoadInformations,
    reloadInformation,
    defaultValueFetchEndpoint,
    defaultValueResponsePayloadPath,
    togglerProperties = {},
    searchEndpoint="",
    searchPayloadIdPath=["id"],
    searchPayloadNamePath=["name"],
    searchPayloadImagePath=["image"],
    forbiddenEndpoint="",
    menuProperties={},
    itemProperties={},
    inputProps={},
    defaultValue = { id : 0, name: "Busque uma opção"},
    setValue = () => {},
    name,
    light = false,
    ...props
}) => {
    const { value: { getValues } } = useFormContext()
    const [selectedOption, setSelectedOption] = useState(defaultValue)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (reloadInformation && doFormLateLoadInformations) {
            const fetchInformation = async (id) => {
                const result = await loadAction({
                    actionMethod: "GET",
                    actionRoute: `${defaultValueFetchEndpoint}/${id}`,
                    responsePayloadPath: defaultValueResponsePayloadPath,
                })

                setSelectedOption(result?.payload ? result.payload : defaultValue)
            }

            fetchInformation(getValues(name))
        }
    }, [reloadInformation])

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
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                if (!_.isEmpty(forbiddenEndpoint)) {
                    const forbiddenResponse = await axios.request({
                        url: forbiddenEndpoint,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    })

                    const forbiddenIds = forbiddenResponse.data.payload
                    const isForbidden = (obj) => forbiddenIds.includes(_.get(obj, searchPayloadIdPath))

                    // Filtra apenas o primeiro nível do array
                    const filteredResults = _.filter(response.data.payload, (item) => !isForbidden(item))

                    response.data.payload = filteredResults
                }

                setResults(response.data.payload)
            } catch (error) {
                console.error("Erro ao buscar registros:", error)
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

    const onSelect = (value) => {
        setValue(name, _.get(value, searchPayloadIdPath), { shouldDirty: true, shouldTouch: true })

        setSelectedOption(value)
        setQuery("")
        setResults([])
    }

    return (
        <Dropdown light={light} {...props}>
            <Dropdown.Toggler
                style={{
                    margin: 0,
                    padding: 0,
                }}
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
                
                {
                    !loading ? (
                        _.map(results, (option, idx) => (
                            <Dropdown.Item
                                key={_.get(option, searchPayloadIdPath)}
                                light={light}
                                onClick={() => onSelect(option)}
                                {...itemProperties}
                                display="flex"
                                justifyContent="space-between"
                            >
                                {_.get(option, searchPayloadNamePath)}

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
                        ))
                    ) : null
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ElasticSearchDropdownInput