import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { Dropdown, Span, Icon, Input } from 'components'

const ElasticSearchDropdownInput = ({
    togglerProperties = {},
    searchEndpoint="",
    payloadIdPath=["id"],
    payloadNamePath=["name"],
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

                setResults(response.data)
            } catch (error) {
                console.error("Erro ao buscar registros:", error)
            }

            setLoading(false)
        }
    
        // Debounce: Espera 500ms após a última digitação para buscar
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
                <Dropdown.Item>
                    <Input
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
                                light={light}
                                key={_.get(option, payloadIdPath)}
                                onClick={() => onSelect(option)}
                                {...itemProperties}
                            >
                                {_.get(option, payloadNamePath)}
                            </Dropdown.Item>
                        ))
                    ) : null
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ElasticSearchDropdownInput