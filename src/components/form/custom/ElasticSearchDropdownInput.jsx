import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { Dropdown, Span, Icon, Input, Image } from 'components'

import noImage from 'images/layout/generic/noImage.png'

const ElasticSearchDropdownInput = ({
    togglerProperties = {},
    searchEndpoint="",
    payloadIdPath=["id"],
    payloadNamePath=["name"],
    payloadImagePath=["image"],
    menuProperties={},
    itemProperties={},
    inputProps={},
    defaultValue = { id : 0, name: "Busque uma opção"},
    setValue = () => {},
    name,
    light = false,
    ...props
}) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (query.length < 2) {
            setResults([])

            return
        }

        const fetchResults = async () => {
            setLoading(true)

            try {
                const response = await axios.request({
                    url: `${searchEndpoint}?query=${query}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                const formattedResults = _.map(response.data, (item) => ({
                    id: _.get(item, payloadIdPath, 0),
                    name: _.get(item, payloadNamePath, "Busque uma opção"),
                    value: item.payload,
                }))

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
        setValue(name, _.get(value, payloadIdPath), { shouldDirty: true, shouldTouch: true })

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
                <Span>{_.get(selectedOption, payloadNamePath) || "Busque uma opção..."}</Span>

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
                                key={_.get(option, payloadIdPath)}
                                light={light}
                                onClick={() => onSelect(option)}
                                {...itemProperties}
                                display="flex"
                                justifyContent="space-between"
                            >
                                {_.get(option, payloadNamePath)}

                                <Image
                                    src={_.get(option, payloadImagePath) || noImage}
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