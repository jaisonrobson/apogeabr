import React, { forwardRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Col as ReactstrapCol } from 'reactstrap'
import _ from 'lodash'

import {
    ButtonGroup,
    Button,
} from 'components'

const RadioButtonsGroup = ({
    defaultValue,
    lateValue = undefined,
    options=[
        { label: "Não", value: 0 },
        { label: "Sim", value: 1 }
    ],
    onSelectOption: onSelectOptionParam
}) => {    
    const [selectedValue, setSelectedValue] = useState(defaultValue || _.first(options))

    useEffect(() => {
        if (lateValue)
            setSelectedValue(_.find(options, { value: lateValue?.value || 0 }))
    }, [lateValue])

    const onSelectOption = (value) => {
        setSelectedValue(value)

        onSelectOptionParam(value)
    }

    return (
        <ButtonGroup width="100%" >
            {
                _.map(options, option => (
                    <Button
                        key={`${option.label}-${option.value}`}
                        color="white"
                        backgroundColor={selectedValue.value === option.value ? '#FFF20060' : '#00000060' }
                        border={selectedValue.value === option.value ? '2px solid #FFF200' : '2px solid gray' }
                        onHover={{
                            animation: {
                                property: 'radioButtonOption 0.5s linear 0s infinite alternate',
                                corpse: `@keyframes radioButtonOption {
                                0%  {transform: scale3d(1,1,1);}
                                100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                            }`
                            }
                        }}
                        onClick={() => onSelectOption(option)}
                        active={selectedValue.value === option.value}
                    >
                        {option.label}
                    </Button>
                ))
            }
        </ButtonGroup>
    )
}

export default RadioButtonsGroup