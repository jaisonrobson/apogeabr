import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonGroup, Button } from 'components'
import _ from 'lodash'

const CheckboxButtonsGroup = ({
    defaultValue = [],
    options = [
        { name: "Opção 1", value: 0 },
        { name: "Opção 2", value: 1 },
        { name: "Opção 3", value: 2 },
        { name: "Opção 4", value: 3 },
        { name: "Opção 5", value: 4 },
    ],
    onSelectOption: onSelectOptionParam
}) => {
    const [selectedValues, setSelectedValues] = useState(defaultValue)

    const onSelectOption = (option) => {
        setSelectedValues(oldValues => {
            // Verifica se a opção já existe no array
            const exists = _.some(oldValues, v => v.value === option.value)
            
            // Adiciona ou remove a opção inteira
            const newValues = exists ? _.filter(oldValues, v => v.value !== option.value) : [...oldValues, option]
            
            // Chama o callback externo com os novos valores
            onSelectOptionParam(newValues)
            
            return newValues
        })
    }

    return (
        <ButtonGroup>
            {_.map(options, option => (
                <Button
                    key={option.value}
                    onClick={() => onSelectOption(option)}
                    active={_.some(selectedValues, v => v.value === option.value)}
                >
                    {option.name}
                </Button>
            ))}
        </ButtonGroup>
    )
}

export default CheckboxButtonsGroup